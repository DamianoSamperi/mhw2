/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function questionToNumber(question){
    switch (question) {
        case 'one':
            return 0;
            break;
        case 'two':
              return 1;
              break;
        case 'three':
              return 2;
              break;
        default:
            break;
    }
}
function check(event){
 
  const CurrentBox=event.currentTarget;
  const index=Boxes.indexOf(CurrentBox);
  let question =CurrentBox.dataset.questionId;
  question=questionToNumber(question);
  console.log(Answer);
  if(Answer[question]!=-1){
  Boxes[Answer[question]].addEventListener('click', check);
  Boxes[Answer[question]].classList.remove('checked');
  CurrentBox.classList.remove('unchecked');
  CheckBoxes[Answer[question]].src="images/unchecked.png";
  AddCheck(CurrentBox,index,question);
  }
  else{ 
  AddCheck(CurrentBox,index,question);
  }
}

function AddCheck(event,index,question){
    event.classList.add('checked');
    event.removeEventListener('click',check);
    Answer[question]=index;
    uncheck(index,question);
    CheckBoxes[index].src="images/checked.png";
}

function uncheck(index,question){
   for(const box of Boxes)
   if(Boxes.indexOf(box)!=index && questionToNumber(box.dataset.questionId)==question){
       box.classList.add('unchecked');
       box.classList.remove('checked');
   }
   if(Answer[0]!=-1 && Answer[1]!=-1 && Answer[2]!=-1){
   RemoveEvent();
   button.classList.remove('Hidden');
   document.querySelector('.Hidden').classList.remove('Hidden');
   let personalità=FindPersonality();
   ShowPersonality(personalità);
   }
}
function RemoveEvent(){
    for(const box of Boxes){
        if(Boxes.indexOf(box)!=Answer[0]&&Boxes.indexOf(box)!=Answer[1]&&Boxes.indexOf(box)!=Answer[2])
        box.removeEventListener('click',check);
    }
}
function FindPersonality(){
    const ID= [];
    ID[0]=Answer[0];
    ID[1]=Answer[1]-9;
    ID[2]=Answer[2]-18;
    if(ID[1]==ID[2])
        return ID[1];
    else
        return ID[0];
}
function ShowPersonality(personalità){
    let i=0;
    for(let p in RESULTS_MAP){
      if(personalità==i){
      personalità=RESULTS_MAP[p];
      break;
      }
    i++;
    }
    console.log(personalità);
    document.querySelector('#titolo_personalità').innerHTML=personalità['title'];
    document.querySelector('#personalità').innerHTML=personalità['contents'];
    
}
function restart(){
    for(var i = 0; i < Answer.length; i++){
        Boxes[Answer[i]].classList.remove('checked');
        CheckBoxes[Answer[i]].src="images/unchecked.png";
        Answer[i]=-1;  
    }
    for(const box of Boxes){
        box.addEventListener('click',check);
        box.classList.remove('unchecked');
    }
    button.classList.add('Hidden');
    document.querySelector('footer').classList.add('Hidden');
    document.querySelector('#titolo_personalità').innerHTML='';
    document.querySelector('#personalità').innerHTML='';
}
const Boxes=[];
const boxes = document.querySelectorAll('.choice-grid div');
const CheckBoxes =document.querySelectorAll('.checkbox');
const Answer =[-1,-1,-1];
const button=document.querySelector('button');
for (const box of boxes)
{
  box.addEventListener('click', check);
  Boxes.push(box);
}
button.addEventListener('click',restart)