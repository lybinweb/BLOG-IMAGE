
export default function router (routes) {

  function handleLoadView () { // this -> el -> #app
    // #/detail/1
    const pathInfo = getRouteInfo(location.href);

    routes.forEach(async item => {
      const routeInfo = getRouteInfo('#' + item.path);

      if (routeInfo.viewName === pathInfo.viewName) {
        const params = {}; // { id: 1 }

        routeInfo.params.map((routeItem, routeIndex) => {
          pathInfo.params.map((pathItem, pathIndex) => {

            if (routeIndex === pathIndex) {
              params[routeItem] = pathItem;
            }
          });
        });

        this.innerHTML = await item.view(params);
        item.script();
      }


    });

  }

  function getRouteInfo (hash) {
    const pathItems = hash.substring(1).split('/').filter(item => item !== '');
    const params = pathItems.slice(1).map(item => item.replace(':', ''));

    return {
      viewName: pathItems[0] || 'home',
      params
    }
  }


  return function (el) {
    window.addEventListener('load', handleLoadView.bind(el), false);
    window.addEventListener('hashchange', handleLoadView.bind(el), false);
  }
}

// c -> s -> v
