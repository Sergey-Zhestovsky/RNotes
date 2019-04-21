let init = {
  projects: [
    {id:"1", title: "title for №1", context: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, hic?", date: "10.10.1994", img: "https://caffaknitted.typepad.com/.a/6a00e54f8f86dc883401287636e5db970c-800wi"},
    {id:"2", title: "title for №2", context: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, hic?", date: "11.10.1994", img: "https://i.kym-cdn.com/photos/images/facebook/000/035/751/41645-pikaman1_super.jpg"},
    {id:"3", title: "title for №3", context: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, hic?", date: "12.10.1994", img: "http://pluspng.com/img-png/random-png-image-mabel-s-sweater-creator-random-gnome-png-gravity-falls-wiki-fandom-powered-by-wikia-510.png"}
  ]
};

export default function projectReducer(state = init, action) {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log(action.project);
      break;
  
    default:
      break;
  }

  return state;
}