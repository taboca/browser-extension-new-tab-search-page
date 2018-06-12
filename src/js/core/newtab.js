'use strict';

const NEW_TAB_PAGE = 'html/newtab.html';

/**
 * @exports newtab
 */
const newtab = {
  /**
   * This method is used to navigate to the set new tab page.
   *
   * @returns {void}
   */
  async init () {
    newtab.openNewTabPage("http://www.taboca.com/labs/search-home/orchid/", true);
  },

  /**
   * This method is used to set the focus either on the address bar or on the web page.
   *
   * @param {string} url - url to open
   * @param {boolean} focus_website - whether the focus should be on the web page instead of the address bar
   *
   * @returns {void}
   */
  async openNewTabPage (url, focus_website) {
    await browser.tabs.getCurrent((tab) => {
      // set focus on website
      if (focus_website) {
        // we need to pass the cookieStoreId to support the container tabs feature of Firefox
        browser.tabs.create({ url : url || 'about:blank', cookieStoreId : tab.cookieStoreId }, () => {
          browser.tabs.remove(tab.id);
        });
      }
      // set focus on address bar
      else {
        // we explicitly set the tab id of the current tab to support the edge case of opening a new tab in the
        // background, for support of add-ons like Gesturefy; we set loadReplace to true to disable the back button
        browser.tabs.update(tab.id, { url : url || 'about:blank', loadReplace : true }, () => {
          // there is nothing to do, but it's needed, otherwise browser.history.deleteUrl() does not work
        });
      }
    });

    // delete spammy new tab page entry from history
    browser.history.deleteUrl({ url : browser.extension.getURL(NEW_TAB_PAGE) });
  }
};

console.log("marcio");

newtab.init();
