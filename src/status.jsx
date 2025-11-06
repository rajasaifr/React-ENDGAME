import { languages } from "./languages"
import { getFarewellText } from "./utils"
function Status(props){

  let topMessage=""
  let paragraph=""
  let styles={}
  if(props.status==="won")
  {
    topMessage="You Win!"
    paragraph="Well done!🎉"
    styles={backgroundColor:"#10A95B"}
  }
  else if(props.status==="lost")
  {
    topMessage="Game Over!"
    paragraph="You lose! Better start learning Assembly"
    styles={backgroundColor:"#f02222ff"}
  }
  else if(props.isLastGuessIncorrect)
  {
    topMessage=getFarewellText(languages[props.index].name)
    styles={backgroundColor:"#7A5EA7"}
  }

  return(
    <div className="status" style={styles}>
        <h2>{topMessage}</h2>
        <p>{paragraph}</p>
    </div>
  )
}

export default Status