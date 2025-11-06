import Header from './header';
import Status from './status';
import './App.css';
import { languages } from './languages';
import React ,{useState} from 'react';
import clsx from 'clsx';
import getWord from './utils'
import ReactConfetti from 'react-confetti';


function App() {


const [currentWord, setWord] = useState(()=>getWord());
const [guessArr,setGuess]=useState([]);


function startNewGame(){

  setWord(getWord())
  setGuess([])
}

const wrongGuessCount = 
  guessArr.filter(letter=> !currentWord.includes(letter.toLowerCase()))
    .length;

const isGameWon=
  currentWord.split("").every(letter=>guessArr.includes(letter.toUpperCase()));

const isGameLost=wrongGuessCount>=languages.length;

let gameStatus = "status";
const isGameOver = isGameLost||isGameWon;

if(isGameOver)
{
  gameStatus= isGameWon?"won":"lost"
}

const wordElem= currentWord.split("").map((alphabet,index)=>{
  let styles={}
  if(isGameLost && !guessArr.includes(alphabet.toUpperCase()))
  {
     styles={color:"#bd0505ff"}
  }

  return (<span key={index} style={styles}>
  {
  isGameLost?alphabet.toUpperCase():  
  guessArr.includes(alphabet.toUpperCase())?alphabet.toUpperCase():""
  }
  </span>)
})




const keyboard="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboardElems=keyboard.split("").map((btn,index)=>{
  
  const isGuessed= guessArr.includes(btn);
  const isCorrect= isGuessed && currentWord.includes(btn.toLocaleLowerCase());
  const isWrong = isGuessed && !currentWord.includes(btn.toLocaleLowerCase());
  
  const className = clsx(
    {
      correct:isCorrect,
      wrong:isWrong
    }
  )
  
  return (<button key={index} className={className}
      onClick={ ()=>addGuess(btn)}
      disabled={isGameOver}>
      {btn}
      </button>
    )  
})

function addGuess(guess){
  setGuess(prevArr=>
    prevArr.includes(guess)? prevArr:[...prevArr,guess]
  )
}

const chipsElem = languages.map((lan,index)=>{
  const isLanguageLost = index < wrongGuessCount;
  const styles={
    backgroundColor: lan.backgroundColor,
    color:lan.color
  }

 return(<span key={lan.name} style={styles} className ={`chips ${isLanguageLost?"lost":""}`}>
    {lan.name}
  </span>
  )
});


let lastGuess = "";
let isLastGuessIncorrect = false;

if (guessArr.length > 0) {
  lastGuess = guessArr[guessArr.length - 1];
  isLastGuessIncorrect = !currentWord.toLowerCase().includes(lastGuess.toLowerCase());
}




  return (
    <div className="App">
      {
        isGameWon &&<ReactConfetti />
      }
     <Header />
     <Status  status={gameStatus} isLastGuessIncorrect={isLastGuessIncorrect} index={wrongGuessCount}/>
     <div className='chips-container'>
      {chipsElem}
     </div>
     <div className='word'>{wordElem}</div>
     <div className='keyboard'>{keyboardElems}</div>
      {isGameOver&& <button className='new-game' onClick={startNewGame}>
        NewGame
        </button>}
    </div>
    
    
  );
}

export default App;
