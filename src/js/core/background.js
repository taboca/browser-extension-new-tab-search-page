let colorObject = {
  accentcolor : 'rgb(255,250,250)',
  textcolor   : 'rgb(0,00,0)',
  toolbar_bottom_separator : 'rgba(0,0,0,0)'
};

let themeProposal = {
  colors : colorObject,
  images : {
    headerURL : '../../images/joanna-kosinska-61432-unsplash_1400.jpg',
  },
  properties: {
  }

}

browser.theme.update(themeProposal);
