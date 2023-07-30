/**
 * All state is exported from here
 * State call example ► State('statename') 
 */
let State = (statename) => {
    switch (statename) {
        case 'auth':
            return useAuthState('auth').value
            break;
        case 'role':
            return useRoleState('role').value
            break;
        case 'common':
            return useCommonState('common').value
            break;        
        case 'menu':
            return useMenuState('menu').value
            break;        
        case 'response':
            return useResponseState('response').value
        default:
            Common().toaster('error', `Statename(${statename}) not matched`)
            break;
    }
}
export { State }
