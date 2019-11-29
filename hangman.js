var words = ["bounce", "divergent", "friend", "waiting", "determined", "sprout", "integration", "photocopy", "breakdown", "secretary", "restoration", "concentration", "criticism", "adventure", "formulate", "unimaginable", "pollutedness"];






var userInputHolder = [];
var userInputHolderLength = userInputHolder.length;
var sameWordCount=0;
var guessesRemain=12;
var sameCharCount=0;
var blankArrayHolder = []; 
var winCount = 0;
var lossCount = 0;
var wordPicked="";
var holdOriginalWordPicked;


//picks word and shows spaces for word picked
function wordPicker(){

    wordPicked = words[Math.floor(Math.random() * words.length)];
    holdOriginalWordPicked= wordPicked;
    console.log(wordPicked);
    

    //resets blank field when a win or loss (from guessremain=0) occurs
    blankArrayHolder=[];

    //creates blank field in html, where each underscore will be filled by correct lowerUserInput choices

    for(var z = 0; z <wordPicked.length; z++){
        blankArrayHolder.push("_ " + "\xa0") ; 
    }
    document.getElementById("blankArray").innerHTML= (blankArrayHolder.join(" "));

    //resets lettersGuessed & numberOfGuessesremaining
    guessesRemain=12;
    document.getElementById("guessesRemaining").innerHTML = guessesRemain;
    userInputHolder = [];
    document.getElementById("lettersGuessed").innerHTML = userInputHolder;
}

wordPicker();

//Adds to the win count
function winCounter(){
    winCount++;
    document.getElementById("winText").innerHTML = "Wins: " + winCount;
    wordPicker();
}

//Adds to the loss count
function lossCounter(){
    lossCount++;
    document.getElementById("lossText").innerHTML = "Losses: " + lossCount;
    wordPicker();
}

//records only letters and converts to lowercase, sends to array
function test(){

document.addEventListener("keypress", function(event){

    if(guessesRemain<1){
        console.log("reset please");
        wordPicker();
        return;
    }

    trackUser=String.fromCharCode(event.keyCode);
    lowerTrackUser= trackUser.toLowerCase();
    if (trackUser.toUpperCase() != trackUser.toLowerCase()){
       
        //scans array to see if letter was pressed, if so, letter is omitted
        for( var i = 0; i < userInputHolderLength; i++){
            if (userInputHolder[i]===(lowerTrackUser)){
                    sameWordCount++;
                    console.log("You have already pressed " + lowerTrackUser);
                    console.log("Your sameWordCount is temporarily: " + sameWordCount);
                }
        }
        //if scan fails to find same letter, push to array and increase array length for next scan
        if (sameWordCount == 0){
            userInputHolder.push(lowerTrackUser);
            document.getElementById("lettersGuessed").innerHTML = userInputHolder;
            userInputHolderLength++;
            console.log("You pressed a new letter: " + lowerTrackUser);
            console.log("Your word count remained at: " + sameWordCount);
        }

        
        console.log("your array length is now " + userInputHolderLength);

        //if you guess right the char is added to blankArray and lettersguessed & no score is subtracted, but subtract if wrong guess
        for(var g = 0; g <wordPicked.length; g++){
            console.log(wordPicked.charAt(g));
            if(wordPicked.charAt(g)===(lowerTrackUser)){
                sameCharCount++;
                console.log(sameCharCount);
                blankArrayHolder[g] = lowerTrackUser;
                document.getElementById("blankArray").innerHTML= (blankArrayHolder.join(" " + "\xa0\xa0"));
            }
        }
        //if you guess wrong, the char is added to lettersguessed, but guess count is only subtracted if previous scan failed to find duplicate letter, if guesses remaining falls to 0, a loss is added and the word, blank field, guesses remaining, and letters already guessed is reset
            if(sameCharCount==0){
                if(sameWordCount==0){
                guessesRemain--;
                document.getElementById("guessesRemaining").innerHTML = guessesRemain;
                }
            }
            if(guessesRemain==0){
                console.log("You ran out of guesses and LOST.")
                lossCounter();
            }
            //same character scanner in lettersGuessed and wordPicked are reset
        sameCharCount=0;
        sameWordCount = 0;

         
        //triggers a win, as user inputs characters, variable is replaced with blank, when variable has no more characters, win achieved 
        for (var p = 0; p < blankArrayHolder.length; p++){
            console.log("this was run and the barray length is " + blankArrayHolder.length);
            for(var a = 0; a < wordPicked.length; a++){
                console.log("the nested loop ran");
                
               
                if(holdOriginalWordPicked.charAt(a)===lowerTrackUser)

                {   console.log("yes");
                    holdOriginalWordPicked = holdOriginalWordPicked.replace(lowerTrackUser, "");
                    console.log("wordPickerReplacer= " + holdOriginalWordPicked);

                    break;
                }
                
                
            }
            
            
        }
        if(holdOriginalWordPicked==""){
            console.log("----ITS A MATCH ----");
            winCounter();
        }
    }
})



}


test();
//----->


