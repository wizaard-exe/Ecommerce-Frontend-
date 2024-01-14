import React,{useState} from 'react';
import './selectBox.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SelectBox = ({value,setSelectedOption}) => {
    // const [selectedOption,setSelectedOption] = useState('None');
    const [selectTogggle,setSelectToggle] = useState(false);
  return (
    <div className='selectBox'>
    <div className='resultBox' onClick={()=>setSelectToggle(!selectTogggle)}><p className='title'>{value}</p> <KeyboardArrowDownIcon className='selectIcon' /></div>
    <div className={`optionCon ${selectTogggle ? "active" : ""}`} >
      <div onClick={(e=>{setSelectedOption(e.target.innerText);setSelectToggle(false)})} >None</div>
      <div onClick={(e=>{setSelectedOption(e.target.innerText);setSelectToggle(false)})} >Price Low to High</div>
      <div onClick={(e=>{setSelectedOption(e.target.innerText);setSelectToggle(false)})} >Price High to Low</div>
    </div>
    </div>
  )
}

export default SelectBox