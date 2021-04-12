import React from 'react';


const Rank = ({name, entries} ) => {
   return(
        <div className='center'>
                <div className='navy f3'>
                    {`${name}, your current entries is `}
                </div>  
                <div className='navy f2'>
                   {entries}
                </div>  
        </div>
    )
}

export default Rank;