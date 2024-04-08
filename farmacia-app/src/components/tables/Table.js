import axios from 'axios';
import React from 'react';

function Table(){
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
    axios.get("http://localhost.com").then((response) => {
        setData(response.data);
    }); }, []);

    if(!data) return null;
    
    return(
        <div>
            <h1>{data.nome}</h1>
        </div>
    )
}

export default Table;