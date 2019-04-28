class Validator {
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

    for (let vKey in values) {
      if (vKey in this.config) {
        let field = this.config[vKey],
          isrequired = false,
          currentProp = setProperty(field.property),
          value;

        for (let i = 0; i < field.rules.length; i++) {
          let rule = field.rules[i];
          if (Array.isArray(rule))
            rule = Validator.setOption(...rule);

          rule === "required" && (isrequired = true);
          value = currentProp ? values[vKey][currentProp.getProperty()] : values[vKey];
          chooseTest(rule, vKey, value, this.error);
        }

        if (!isrequired && value == undefined )
          delete this.error[vKey];
      }
    }

    function setProperty(prop) {
      if (prop == undefined)
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

    function chooseTest(option, key, data, error) {
      let isError = false;
      
      switch (option.toString()) {
        case "required":
          isError = required(data);
          break;
        case "email":
          isError = email(data);
          break;
        case "password":
          isError = password(data, option.value);
          break;
        case "maxSize":
          isError = maxSize(data, option.value);
          break;
        case "larger":
          isError = larger(data, option.value);
          break;
        case "test":
          isError = test(data, option.value);
          break;
        default:
          break;
      }

      if (isError) {
        let name = option.describe || option.toString();

        error[key] && 
        (error[key].push(name)) || 
        (error[key] = [name]);
      }
    }

    function required(data) {
      return (data === undefined || data == "" || data === null);
    }

    function maxSize(data = "", size) {
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

module.exports = Validator