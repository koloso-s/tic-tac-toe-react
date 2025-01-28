import "./Menu.css"

export default function Menu({setGameMode}){
    return(
        <>
        <h1>Tic Tac Toe</h1>
        <div className="buttons">
                <div className="button" onClick={()=>{setGameMode("player-vs-player")}}>player-vs-player</div>
                <div className="button" >player-vs-computer</div>
        </div>
        </>
    )
}