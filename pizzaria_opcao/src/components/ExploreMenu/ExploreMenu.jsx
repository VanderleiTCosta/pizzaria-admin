import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Menu</h1>
      <p className='explore-menu-text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse adipisci magni, laboriosam quasi, deserunt sint eaque nam similique suscipit, laborum commodi voluptatem exercitationem sunt quaerat. Possimus accusantium asperiores quo minima!</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
