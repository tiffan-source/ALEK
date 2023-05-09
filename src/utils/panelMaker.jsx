/**
 * Make Panel Struture
 * @param {Object} structures
 * @returns {String}
 */

export let panelMaker = (structures, ancestor)=>{
    if(Object.keys(structures).length === 0)
        return "";

    return (
        <ul className={ancestor ? "px-8" : ""}>
            {Object.keys(structures).map((structure, index)=>{
                let path = `${ancestor ? '/'+ancestor : ''}${'/'+structure}`;
                let reelPath = window.location.pathname.replace('%', ' ');
                console.log(reelPath);
                return (
                    <li key={index}>
                        <a href={path}>{structure}</a>
                        {panelMaker(structures[structure], ancestor ? ancestor+'/'+structure : structure)}
                    </li>
                )
            })}
        </ul>
    )
};