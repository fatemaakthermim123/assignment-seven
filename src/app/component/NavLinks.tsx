
import NavStyle from './NavStyle';
 interface navs{
    slug:string,
      id: string,
      nameBn: string,
      icon:string
 }
const NavLinks = async() => {
    
  const res= await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
  const data=await res.json();
  const navs:navs[]=data;
 ;
    return (
        <div className='container mx-auto p-6  bg-white'>
          <NavStyle navs={navs}/>
        </div>
    );
};

export default NavLinks;