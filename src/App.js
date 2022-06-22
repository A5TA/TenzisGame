import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)

    React.useEffect(() => {
        let previous = dice[0]
        for(let i = 0; i< dice.length - 1;i++) {
            if (previous.value !== dice[i].value){
                return
            } else if (dice[i].isHeld === false){
                return
            }
            previous = dice[i]
        }
        setTenzies(true)
        console.log("You won")
    },[dice])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(
                {
                    value: Math.ceil(Math.random() * 6), 
                    isHeld: false,
                    id: nanoid()
                })
        }
        return newDice
    }
    
    function rollDice() {
        setRollCount(prevCount => prevCount + 1)
        if (tenzies === true) {
            console.log("NEW GAME")
            setRollCount(0)
            setDice(allNewDice())
            setTenzies(false)
        } else {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die: {
                    value: Math.ceil(Math.random() * 6), 
                    isHeld: false,
                    id: nanoid() 
                }
            }))
        }
        
    }
    
    function holdDice(diceId) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === diceId ? {...die, isHeld: !die.isHeld}: die
        }))
    }    

    const diceElements = dice.map(die => (
        <Die holdDice={() => holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld}/>
    ))

    // console.log(dice)
    
    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="dice-info">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <h4 className="roll-count">Roll Count: {rollCount}</h4>
            <button id="button-dice"className="roll-dice" onClick={rollDice}>{tenzies ? "New Game": "Roll"}</button>
        </main>
    )
}