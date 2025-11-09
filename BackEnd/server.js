const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let solvedCube =  [
  ['(255 , 0 , 0)', '(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)'], // red
  ['(0 , 128 , 0)', '(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)'], // green
  [ '(0 , 0 , 255)',  '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)'], // blue
  ['(255 , 255 , 0)', '(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)'], // yellow
  ['(255 , 119 , 0)', '(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)'] , // orange
  ['(255 , 255 , 255)', '(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)'] , // white
]

const possible_moves = [
  "x0+" , "x1+" , "x2+" , 
  "x0-" , "x1-" , "x2-" , 

  "y0+" , "y1+" , "y2+" , 
  "y0-" , "y1-" , "y2-" , 

  "z0+" , "z1+" , "z2+" ,
  "z0-" , "z1-" , "z2-" 
]


async function blindfoldSolve(firstcube) {

    // برسی مکعب سالم اول کار
  if (JSON.stringify(firstcube) === JSON.stringify(solvedCube)) { return 1 } 
  
  let maxdepth = 10;
  let depth = 1 ;
  let solution_find = false

 while(!solution_find) {

    const indices = new Array(depth).fill(0); // ⭐
    
    const totalCombinations = Math.pow(possible_moves.length, depth);

    console.log("depth : " , depth , " - totalCombinations : " , totalCombinations)    // صرفا جهت نماییش

   for (let i = 0; i < totalCombinations; i++) {


    // ساخت حرکات جدید و تست برای جواب

    let currentCombination = '';  
    for (let j = 0; j < depth; j++) { 
        currentCombination += possible_moves[indices[j]] + ' '; 
    }

    const copyCub = JSON.parse(JSON.stringify(firstcube));
    new_cube =  await generate_cube(copyCub , currentCombination.trim())

    if(JSON.stringify(new_cube) === JSON.stringify(solvedCube)) {
    
        solution_find = true
        return currentCombination.trim() 

    }

    // اضافه کردن ترکیب حالت ها

    for (let j = depth - 1; j >= 0; j--) {
      if (indices[j] < possible_moves.length - 1) { // indices[j] < 17
          indices[j]++;
          break;
      } else {
          indices[j] = 0;
      }
    }
    // console.log(indices)
  }

  if (depth > maxdepth) {
    solution_find = true
    return false
  }

  depth+=1

}

}

async function generate_cube(cub , steps ) {
  
  const listofsteps = steps.split(' ').map(item => item.trim())
  
  for(let i of listofsteps){
    
    let mood = i[0] 
    let index = parseInt(i[1]);
    let position = i[2]
  
    if (position == "+"){
    
      if (mood == "x") {
        
        let m1 = 0 + (index * 3)
        let m2 = 1 + (index * 3)
        let m3 = 2 + (index * 3)
      
      
        // red
        const side0 = [cub[0][ 2 + (index * 3)] , cub[0][1 + (index * 3)] , cub[0][0 + (index * 3)]];
        // green
        const side1 = [cub[1][2 + (index * 3)] , cub[1][1 + (index * 3)] , cub[1][0 + (index * 3)]];
        // blue
        const side2 = [cub[2][m1] , cub[2][m2] , cub[2][m3]];
        // yellow
        const side3 = [cub[3][m1] , cub[3][m2] , cub[3][m3]];
      
      
        // red
        const side00 = [side0[0] , side0[1] , side0[2]]; 
        // green
        const side11 = [side1[0] , side1[1] , side1[2]]; 
        // blue
        const side22 = [side2[0] , side2[1] , side2[2]]; 
        // yellow
        const side33 = [side3[0] , side3[1] , side3[2]]; 
      
      
        cub[0][2 + (index * 3)] = side22[0]
        cub[0][1 + (index * 3)] = side22[1]
        cub[0][0 + (index * 3)] = side22[2]
        
        cub[1][2 + (index * 3)] = side33[0]
        cub[1][1 + (index * 3)] = side33[1]
        cub[1][0 + (index * 3)] = side33[2]
      
        cub[2][m1] = side11[0]
        cub[2][m2] = side11[1]
        cub[2][m3] = side11[2]
      
        cub[3][m1] = side00[0]
        cub[3][m2] = side00[1]
        cub[3][m3] = side00[2]
        
        
      
        if (index ==  0) {
      
          // orange
          const sidex = [cub[4][0] , cub[4][1] , cub[4][2] , cub[4][3] , cub[4][4] , cub[4][5] , cub[4][6] , cub[4][7] , cub[4][8] ];
          const sidex0 = [sidex[0] , sidex[1] , sidex[2] , sidex[3] , sidex[4] , sidex[5] , sidex[6] , sidex[7] , sidex[8] ]; 
          cub[4][0] = sidex0[6];
          cub[4][1] = sidex0[3];
          cub[4][2] = sidex0[0];
          cub[4][3] = sidex0[7];
          cub[4][5] = sidex0[1];
          cub[4][6] = sidex0[8];
          cub[4][7] = sidex0[5];
          cub[4][8] = sidex0[2];
      
        }else if (index == "2") {
      
          // white
          const sidex = [cub[5][0] , cub[5][1] , cub[5][2] , cub[5][3] , cub[5][4] , cub[5][5] , cub[5][6] , cub[5][7] , cub[5][8] ];
          const sidex0 = [sidex[0] , sidex[1] , sidex[2] , sidex[3] , sidex[4] , sidex[5] , sidex[6] , sidex[7] , sidex[8] ]; 
      
          cub[5][6] = sidex0[0];
          cub[5][3] = sidex0[1];
          cub[5][0] = sidex0[2];
          cub[5][7] = sidex0[3];
          cub[5][1] = sidex0[5];
          cub[5][8] = sidex0[6];
          cub[5][5] = sidex0[7];
          cub[5][2] = sidex0[8];
        }
      
      }else if (mood == "y"){
      
        // blue
        const side2 = [cub[2][2 - index] , cub[2][5 - index] , cub[2][8 - index]];
        // yellow
        const side3 = [cub[3][6 + index] , cub[3][3 + index] , cub[3][0 + index]];
        // orange
        const side4 = [cub[4][6 - (3 * index)] , cub[4][7 - (3 * index)] , cub[4][8 - (3 * index)]];
        // white
        const side5 = [cub[5][2 + (3 * index)] , cub[5][1 + (3 * index)] , cub[5][0 + (3 * index)]];
        
        //blue
        const side22 = [side2[0] , side2[1] , side2[2]]; 
        // yellow
        const side33 = [side3[0] , side3[1] , side3[2]]; 
        // orange
        const side44 = [side4[0] , side4[1] , side4[2]]; 
        //white
        const side55 = [side5[0] , side5[1] , side5[2]]; 
      
      
        cub[2][2 - index] = side44[0]
        cub[2][5 - index] = side44[1]
        cub[2][8 - index] = side44[2]
      
        cub[3][6 + index] = side55[0]
        cub[3][3 + index] = side55[1]
        cub[3][0 + index] = side55[2]
      
        cub[4][6 - (3 * index)] = side33[0]
        cub[4][7 - (3 * index)] = side33[1]
        cub[4][8 - (3 * index)] = side33[2]
      
        cub[5][2 + (3 * index)] = side22[0]
        cub[5][1 + (3 * index)] = side22[1]
        cub[5][0 + (3 * index)] = side22[2]
      
      
        if (index ==  0) {
      
          // red
          const sidex = [cub[0][0] , cub[0][1] , cub[0][2] , cub[0][3] , cub[0][4] , cub[0][5] , cub[0][6] , cub[0][7] , cub[0][8] ];
          const sidex0 = [sidex[0] , sidex[1] , sidex[2] , sidex[3] , sidex[4] , sidex[5] , sidex[6] , sidex[7] , sidex[8] ]; 
          cub[0][0] = sidex0[6];
          cub[0][1] = sidex0[3];
          cub[0][2] = sidex0[0];
          cub[0][3] = sidex0[7];
          cub[0][5] = sidex0[1];
          cub[0][6] = sidex0[8];
          cub[0][7] = sidex0[5];
          cub[0][8] = sidex0[2];
      
        }else if (index == "2") {
      
          // green
          const sidex = [cub[1][0] , cub[1][1] , cub[1][2] , cub[1][3] , cub[1][4] , cub[1][5] , cub[1][6] , cub[1][7] , cub[1][8] ];
          const sidex0 = [sidex[0] , sidex[1] , sidex[2] , sidex[3] , sidex[4] , sidex[5] , sidex[6] , sidex[7] , sidex[8] ]; 
      
          cub[1][6] = sidex0[0];
          cub[1][3] = sidex0[1];
          cub[1][0] = sidex0[2];
          cub[1][7] = sidex0[3];
          cub[1][1] = sidex0[5];
          cub[1][8] = sidex0[6];
          cub[1][5] = sidex0[7];
          cub[1][2] = sidex0[8];
      
        }
      
      }else {
        
        // red
        const side0 = [cub[0][8 - index] , cub[0][5 - index] , cub[0][2 - index]];
        // green
        const side1 = [cub[1][0 + index] , cub[1][3 + index] , cub[1][6 + index]];
        // orange
        const side4 = [cub[4][8 - index] , cub[4][5 - index] , cub[4][2 - index]];
        // white
        const side5 = [cub[5][8 - index] , cub[5][5 - index] , cub[5][2 - index]];
      
      
        // red
        const side00 = [side0[0] , side0[1] , side0[2]]; 
        // green
        const side11 = [side1[0] , side1[1] , side1[2]]; 
        // orange
        const side44 = [side4[0] , side4[1] , side4[2]]; 
        //white
        const side55 = [side5[0] , side5[1] , side5[2]]; 
      
      
      
        cub[0][8 - index] = side44[0]
        cub[0][5 - index] = side44[1]
        cub[0][2 - index] = side44[2]
      
        cub[1][0 + index] = side55[0]
        cub[1][3 + index] = side55[1]
        cub[1][6 + index] = side55[2]
      
        cub[4][8 - index] = side11[0]
        cub[4][5 - index] = side11[1]
        cub[4][2 - index] = side11[2]
      
        cub[5][8 - index] = side00[0]
        cub[5][5 - index] = side00[1]
        cub[5][2 - index] = side00[2]
      
        if (index ==  0) {
      
          // blue
          const sidex = [cub[2][0] , cub[2][1] , cub[2][2] , cub[2][3] , cub[2][4] , cub[2][5] , cub[2][6] , cub[2][7] , cub[2][8] ];
          const sidex0 = [sidex[0] , sidex[1] , sidex[2] , sidex[3] , sidex[4] , sidex[5] , sidex[6] , sidex[7] , sidex[8] ]; 
          cub[2][0] = sidex0[6];
          cub[2][1] = sidex0[3];
          cub[2][2] = sidex0[0];
          cub[2][3] = sidex0[7];
          cub[2][5] = sidex0[1];
          cub[2][6] = sidex0[8];
          cub[2][7] = sidex0[5];
          cub[2][8] = sidex0[2];
      
        }else if (index == "2") {
      
          // yellow
          const sidex = [cub[3][0] , cub[3][1] , cub[3][2] , cub[3][3] , cub[3][4] , cub[3][5] , cub[3][6] , cub[3][7] , cub[3][8] ];
          const sidex0 = [sidex[0] , sidex[1] , sidex[2] , sidex[3] , sidex[4] , sidex[5] , sidex[6] , sidex[7] , sidex[8] ]; 
      
          cub[3][6] = sidex0[0];
          cub[3][3] = sidex0[1];
          cub[3][0] = sidex0[2];
          cub[3][7] = sidex0[3];
          cub[3][1] = sidex0[5];
          cub[3][8] = sidex0[6];
          cub[3][5] = sidex0[7];
          cub[3][2] = sidex0[8];
      
        }
      
      }

    }else { 
        // سه بار اجرا

        let tempCube = JSON.parse(JSON.stringify(cub));
        
        for(let i = 0; i < 3; i++) {
            const clockwiseMove = mood + index + "+";
            tempCube = await generate_cube(tempCube, clockwiseMove);
        }

        // جاگذاری معکب کپی شده با مکعب جواب 

        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 9; j++) {
            cub[i][j] = tempCube[i][j];
            }
        }    
    }
  }

  return cub
}

app.post('/save-cube', async (req, res) => {

  const cube = req.body.cub;
  const solution = await blindfoldSolve(cube);

  console.log(solution)
  console.log("- - - - - - - - - - - - - - -")

  if (solution == 1) {
    res.status(200).json({steps: 1});
  } else if (solution){
    res.status(200).json({ steps : solution });
  } else {
    res.status(500).json({ steps : 0 });
  }

});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
