

import { Outlet } from 'react-router'
import NavigatePage from './NavigatePage';

function LayOutComponent() {
    return (
      <>
        <NavigatePage />
        <Outlet />
      </>
    );
      
     
}

export default LayOutComponent