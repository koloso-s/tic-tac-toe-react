import "./Menu.css"

export default function Menu({setGameMode,setPlayerChoice}){
    return(
        <>
        <h1>Tic Tac Toe</h1>
        <div className="buttons">
                <div className="button" onClick={()=>{setGameMode("player-vs-player")}}>player-vs-player</div>
                <div className="button" onClick={()=>{setGameMode("player-vs-computer"),setPlayerChoice(null)}}>player-vs-computer</div>
        </div>
        </>
    )
}