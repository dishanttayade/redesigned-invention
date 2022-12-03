import React from 'react'
import RealEstate from './components/RealEstate';

const Marketplace = () => {
   const whateverbrought = [
        "qwertyuiop",
        "asdfghjkl",
        "zxcvbnm,.",
        "qwdfghnm",
        "zxfghjkp",
      ];
  return (
    <div className='grid grid-cols-4 gap-4'>
        {
            whateverbrought.map((nft) => {
                return (<RealEstate description={nft} />)
            })
        }
    </div>
  )
}


export default Marketplace;