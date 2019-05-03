export default class Validator {
  constructor(config) {
    this.error = {};
    this.config = config;

    for (let vKey in this.config) {
      if (Array.isArray(this.config[vKey]))
        this.config[vKey] = { rules: this.config[vKey] }
    }
  }

  reset() {
    this.error = Object.create(null);
  }

  get errors() {
    return this.error;
  }

  validate(values) {
    this.reset();

    for (let fieldName in this.config) {
      let fieldConfig = this.config[fieldName],
        isrequired = false,
        currentProp = setProperty(fieldConfig.property),
        value;

      for (let i = 0; i < fieldConfig.rules.length; i++) {
        let rule = fieldConfig.rules[i];

        if (Array.isArray(rule))
          rule = Validator.setOption(...rule);

        rule === "required" && (isrequired = true);
        value = setValue(values, fieldName, currentProp);
        chooseTest(rule, fieldName, value, values, this.error);
      }

      if (!isrequired && value === undefined)
        delete this.error[fieldName];
    }
    
    function setValue(values, valueName, fieldProperty) {
      if (!values[valueName])
        return null;

      return fieldProperty
        ? values[valueName][fieldProperty.getProperty()]
        : values[valueName];
    }

    function setProperty(prop) {
      if (prop == null)
        return;

      let result = {
        iterator: 0,
        getProperty() {
          return this.prop[Math.min(this.iterator++, prop.length - 1)]
        }
      }

      if (Array.isArray(prop))
        result.prop = prop;
      else
        result.prop = [prop];

      return result;
    }

    function chooseTest(option, key, value, allValues, error) {
      let isError = false;
      
      switch (option.toString()) {
        case "required":
          isError = required(value);
          break;
        case "email":
          isError = email(value);
          break;
        case "password":
          isError = password(value, allValues[option.value]);
          break;
        case "maxSize":
          isError = maxSize(value, option.value);
          break;
        case "larger":
          isError = larger(value, option.value);
          break;
          case "fullName":
          isError = fullName(value);
          break;
        case "test":
          isError = test(value, option.value);
          break;
        default:
          break;
      }

      if (isError) {
        let name = option.describe || option.toString();

        error[key] 
        ? (error[key].push(name)) 
        : (error[key] = [name]);
      }
    }

    function required(data) {
      return (data === undefined || data == "" || data === null);
    }

    function maxSize(data, size) {
      if (data === null)
        return;

      return data.toString().length > size;
    }

    function larger(data, size) {
      return Number(data) > size;
    }

    function email(data) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(String(data).toLowerCase());
    }

    function password(pass, rePass) {
      return pass !== rePass;
    }

    function fullName(string) {
      let regExp = new RegExp("^\\p{L}+\\s+\\p{L}+$", "u");

      return !regExp.test(string);
    }

    function test(str, regExp) {
      return !regExp.test(str);
    }

    return this.error;
  }

  static setOption(name, value, describe) {
    return {
      name,
      value,
      describe,
      toString() {
        return name;
      }
    }
  }
}