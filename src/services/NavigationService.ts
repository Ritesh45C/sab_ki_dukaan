import {CommonActions, NavigationContainerRef} from '@react-navigation/native';
/**
 * A navegacao esta implementada como um servico para poder ser utilizada fora dos componentes React.
 * As rotas podem ser acessadas de dentro dos Sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

// define navigator global
let navigator: any;

/**
 * @function setTopLevelNavigator
 * @param  {ref} navigatorRef referencia da instancia de navegacao
 */
function setTopLevelNavigator(navigatorRef: NavigationContainerRef) {
  navigator = navigatorRef;
}

/**
 * @function navigate
 * @param  {string} routeName Nome da rota para onde nevegar
 * @param  {any} params    {description}
 */

function goBack(route: any, state: any) {
  navigator.dispatch({
    ...CommonActions.goBack(),
    source: route.key,
    target: state.key,
  });
}

function onlyGoBack() {
  navigator.dispatch(CommonActions.goBack());
}
function navigate(routeName: string, params: object | undefined) {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}
function navigateToShoppingCredits() {
  navigator.dispatch(
    CommonActions.reset({
      index: 2,
      routes: [{name: 'AppStack'},{name:'ShoppingCreditsStack'}],
    }),
  );
}

/**
 * Navega para uma rota especifica E reseta o navigation history
 * Isso sifnifica que o usuario nao pode retornar (goBack)
 *
 * @function navigateAndReset
 * @param routeName Nome da rota para onde nevegar
 * @param params Parametros da rota
 */
function navigateAndResetMain(routeName: string, params: object | undefined) {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'MainDrawer'}],
    }),
  );
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}
function navigateAndReset(routeName: string, params: object | undefined) {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    }),
  );

}

export default {
  goBack,
  navigate,
  navigateAndReset,
  navigateAndResetMain,
  setTopLevelNavigator,
  navigateToShoppingCredits,
  onlyGoBack
};
