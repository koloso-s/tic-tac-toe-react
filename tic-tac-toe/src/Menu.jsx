import "./Menu.css"

export default function Menu({setGameMode}){
    return(
        <div className="buttons">
                    <button onClick={()=>{setGameMode("player-vs-player")}}>player-vs-player</button>
                    <button>player-vs-computer</button>
        </div>
    )
}