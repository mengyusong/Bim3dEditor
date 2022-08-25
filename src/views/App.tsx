import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routerConfig from './router';
import store from './store'
import GlobalStyle from './styles/GlobalStyle';
import ThemeProviderWrapper from './styles';

 const App = () =>{
   const element = useRoutes(routerConfig);

   return (
        <Provider store={store}>
            <ThemeProviderWrapper>
                <GlobalStyle/>
                {element}
            </ThemeProviderWrapper>
        </Provider>
   )
 } 
 export default App;
