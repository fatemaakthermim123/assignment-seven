
import Marquee from './Marquee';
import NavStyle from './NavStyle';
 interface navs{
    slug:string,
      id: string,
      nameBn: string,
      icon:string
 }
const NavLinks = async() => {
    
  const res= await fetch('https://openapi.programming-hero.com/api/bazardor/categories')
  const data=await res.json();
  const navs:navs[]=data;
 ;
    return (
      <div>
      <div className='border border-green-200 py-1'>
        <div className='container mx-auto  '>
          <NavStyle navs={navs}/>
        </div> 
        
        </div>
        <Marquee></Marquee>
        </div>
    );
};

export default NavLinks;