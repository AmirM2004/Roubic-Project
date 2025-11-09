// --------- کد تعریف مکعب ها  و نمایش ---------


// let cub = {
//   top : ["orange" , "orange" , "orange" , "orange" , "orange" , "orange"] ,
//   bottom : ["white" , "white" , "white" , "white" , "white" , "white"] ,
//   left : ["red" , "red" , "red" , "red" , "red" , "red"] ,
//   right : ["green" , "green" , "green" , "green" , "green" , "green"] ,
//   front : ["yellow" , "yellow" , "yellow" , "yellow" , "yellow" , "yellow"] ,
//   back : ["blue" , "blue" , "blue" , "blue" , "blue" , "blue"] ,
// }

let cub = [ // ⭐️
  ['(255 , 0 , 0)', '(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)','(255 , 0 , 0)'], // red
  ['(0 , 128 , 0)', '(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)','(0 , 128 , 0)'], // green
  [ '(0 , 0 , 255)',  '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)', '(0 , 0 , 255)'], // blue
  ['(255 , 255 , 0)', '(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)','(255 , 255 , 0)'], // yellow
  ['(255 , 119 , 0)', '(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)','(255 , 119 , 0)'] , // orange
  ['(255 , 255 , 255)', '(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)','(255 , 255 , 255)'] , // white
]

// صحنه، دوربین و رندرر را ایجاد می‌کنیم
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// اضافه کردن کنترل‌های چرخش با موس
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
camera.position.z = 5;
// مکعب 3x3x3 را ایجاد می‌کنیم
const cubeSize = 3;  // اندازه مکعب
const squareSize = 1; // اندازه هر مربع
const gap = 0.02; // فاصله بین مربع‌ها
camera.position.set(4, 4, 4); // موقعیت دوربین از بغل
camera.lookAt(0, 0, 0); // تمرکز دوربین به مرکز صحنه
// رنگ‌های مورد استفاده برای هر وجه
const colors = ["red", "green", "blue", "yellow", "#Ff7700", "white"]; // قرمز، سبز، آبی، زرد، نارنجی، سفید
// ایجاد هر وجه مکعب با 9 مربع
const faces = [];

function createFace(color, position, rotation) {

  const face = new THREE.Group(); // ساخت یک گروه از مربع های اون وجه ⭐️
  const geometry = new THREE.PlaneGeometry(squareSize, squareSize);

  // ایجاد 9 مربع (3x3) برای هر وجه با متریال جداگانه
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide});
      const square = new THREE.Mesh(geometry, material);
      const x = (col - 1) * (squareSize + gap);  // تنظیم موقعیت x
      const y = (1 - row) * (squareSize + gap);  // تنظیم موقعیت y
      square.position.set(x, y, 0);  // تنظیم موقعیت هر مربع در صفحه
      face.add(square); // اضافه کردن به تابع  ⭐️
    }
  }

  face.position.copy(position);
  face.rotation.set(rotation.x, rotation.y, rotation.z);
  scene.add(face);
  faces.push(face); // اضافه کردن وجه به آرایه faces
  return face;
}

// موقعیت و چرخش هر وجه مکعب
createFace(colors[0], new THREE.Vector3(0, 0, cubeSize / 2), new THREE.Euler(0, 0, 0)); // جلو
createFace(colors[1], new THREE.Vector3(0, 0, -cubeSize / 2), new THREE.Euler(0, Math.PI, 0)); // عقب
createFace(colors[2], new THREE.Vector3(cubeSize / 2, 0, 0), new THREE.Euler(0, -Math.PI / 2, 0)); // راست
createFace(colors[3], new THREE.Vector3(-cubeSize / 2, 0, 0), new THREE.Euler(0, Math.PI / 2, 0)); // چپ
createFace(colors[4], new THREE.Vector3(0, cubeSize / 2, 0), new THREE.Euler(-Math.PI / 2, 0, 0)); // بالا
createFace(colors[5], new THREE.Vector3(0, -cubeSize / 2, 0), new THREE.Euler(Math.PI / 2, 0, 0)); // پایین

// تابع رندر
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  
// واکنش به تغییر اندازه صفحه
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });


// --------- کدی اصلی چرخش ها ---------

// تابع برای جابجایی رنگ‌ها
function swapColors(mood, index) {

  if (mood == "x") {
    
    let m1 = 0 + (index * 3)
    let m2 = 1 + (index * 3)
    let m3 = 2 + (index * 3)

    // red
    const side0 = [faces[0].children[ 2 + (index * 3)].material.color , faces[0].children[1 + (index * 3)].material.color , faces[0].children[0 + (index * 3)].material.color];
    // green
    const side1 = [faces[1].children[2 + (index * 3)].material.color , faces[1].children[1 + (index * 3)].material.color , faces[1].children[0 + (index * 3)].material.color];
    // blue
    const side2 = [faces[2].children[m1].material.color , faces[2].children[m2].material.color , faces[2].children[m3].material.color];
    // yellow
    const side3 = [faces[3].children[m1].material.color , faces[3].children[m2].material.color , faces[3].children[m3].material.color];

    // red
    const side00 = [side0[0].clone() , side0[1].clone() , side0[2].clone()]; 
    // green
    const side11 = [side1[0].clone() , side1[1].clone() , side1[2].clone()]; 
    // blue
    const side22 = [side2[0].clone() , side2[1].clone() , side2[2].clone()]; 
    // yellow
    const side33 = [side3[0].clone() , side3[1].clone() , side3[2].clone()]; 

    
    side2[0].set(side11[0]);
    side2[1].set(side11[1]);
    side2[2].set(side11[2]);
    
    side0[0].set(side22[0]);
    side0[1].set(side22[1]);
    side0[2].set(side22[2]);
    
    side3[0].set(side00[0]);
    side3[1].set(side00[1]);
    side3[2].set(side00[2]);
    
    side1[0].set(side33[0]);
    side1[1].set(side33[1]);
    side1[2].set(side33[2]);
    
    if (index ==  0) {

      // orange
      const sidex = [faces[4].children[0].material.color , faces[4].children[1].material.color , faces[4].children[2].material.color , faces[4].children[3].material.color , faces[4].children[4].material.color , faces[4].children[5].material.color , faces[4].children[6].material.color , faces[4].children[7].material.color , faces[4].children[8].material.color ];
      const sidex0 = [sidex[0].clone() , sidex[1].clone() , sidex[2].clone() , sidex[3].clone() , sidex[4].clone() , sidex[5].clone() , sidex[6].clone() , sidex[7].clone() , sidex[8].clone() ]; 
      sidex[0].set(sidex0[6]);
      sidex[1].set(sidex0[3]);
      sidex[2].set(sidex0[0]);
      sidex[3].set(sidex0[7]);
      // sidex[4].set(sidex0[0]); //dont need
      sidex[5].set(sidex0[1]);
      sidex[6].set(sidex0[8]);
      sidex[7].set(sidex0[5]);
      sidex[8].set(sidex0[2]);

    }else if (index == "2") {

      // white
      const sidex = [faces[5].children[0].material.color , faces[5].children[1].material.color , faces[5].children[2].material.color , faces[5].children[3].material.color , faces[5].children[4].material.color , faces[5].children[5].material.color , faces[5].children[6].material.color , faces[5].children[7].material.color , faces[5].children[8].material.color ];
      const sidex0 = [sidex[0].clone() , sidex[1].clone() , sidex[2].clone() , sidex[3].clone() , sidex[4].clone() , sidex[5].clone() , sidex[6].clone() , sidex[7].clone() , sidex[8].clone() ]; 

      sidex[6].set(sidex0[0]);
      sidex[3].set(sidex0[1]);
      sidex[0].set(sidex0[2]);
      sidex[7].set(sidex0[3]);
      // sidex[4].set(sidex0[4]); //dont need
      sidex[1].set(sidex0[5]);
      sidex[8].set(sidex0[6]);
      sidex[5].set(sidex0[7]);
      sidex[2].set(sidex0[8]);
    }

  }else if (mood == "y"){

    // blue
    const side2 = [faces[2].children[2 - index].material.color , faces[2].children[5 - index].material.color , faces[2].children[8 - index].material.color];
    // yellow
    const side3 = [faces[3].children[6 + index].material.color , faces[3].children[3 + index].material.color , faces[3].children[0 + index].material.color];
    // orange
    const side4 = [faces[4].children[6 - (3 * index)].material.color , faces[4].children[7 - (3 * index)].material.color , faces[4].children[8 - (3 * index)].material.color];
    // white
    const side5 = [faces[5].children[2 + (3 * index)].material.color , faces[5].children[1 + (3 * index)].material.color , faces[5].children[0 + (3 * index)].material.color];
    
    //blue
    const side22 = [side2[0].clone() , side2[1].clone() , side2[2].clone()]; 
    // yellow
    const side33 = [side3[0].clone() , side3[1].clone() , side3[2].clone()]; 
    // orange
    const side44 = [side4[0].clone() , side4[1].clone() , side4[2].clone()]; 
    //white
    const side55 = [side5[0].clone() , side5[1].clone() , side5[2].clone()]; 

    side2[0].set(side44[0]);
    side2[1].set(side44[1]);
    side2[2].set(side44[2]);
  
    side5[0].set(side22[0]);
    side5[1].set(side22[1]);
    side5[2].set(side22[2]);
  
    side3[0].set(side55[0]);
    side3[1].set(side55[1]);
    side3[2].set(side55[2]);
  
    side4[0].set(side33[0]);
    side4[1].set(side33[1]);
    side4[2].set(side33[2]);


    if (index ==  0) {

      // red
      const sidex = [faces[0].children[0].material.color , faces[0].children[1].material.color , faces[0].children[2].material.color , faces[0].children[3].material.color , faces[0].children[4].material.color , faces[0].children[5].material.color , faces[0].children[6].material.color , faces[0].children[7].material.color , faces[0].children[8].material.color ];
      const sidex0 = [sidex[0].clone() , sidex[1].clone() , sidex[2].clone() , sidex[3].clone() , sidex[4].clone() , sidex[5].clone() , sidex[6].clone() , sidex[7].clone() , sidex[8].clone() ]; 
      sidex[0].set(sidex0[6]);
      sidex[1].set(sidex0[3]);
      sidex[2].set(sidex0[0]);
      sidex[3].set(sidex0[7]);
      // sidex[4].set(sidex0[0]); //dont need
      sidex[5].set(sidex0[1]);
      sidex[6].set(sidex0[8]);
      sidex[7].set(sidex0[5]);
      sidex[8].set(sidex0[2]);

    }else if (index == "2") {

      // green
      const sidex = [faces[1].children[0].material.color , faces[1].children[1].material.color , faces[1].children[2].material.color , faces[1].children[3].material.color , faces[1].children[4].material.color , faces[1].children[5].material.color , faces[1].children[6].material.color , faces[1].children[7].material.color , faces[1].children[8].material.color ];
      const sidex0 = [sidex[0].clone() , sidex[1].clone() , sidex[2].clone() , sidex[3].clone() , sidex[4].clone() , sidex[5].clone() , sidex[6].clone() , sidex[7].clone() , sidex[8].clone() ]; 

      sidex[6].set(sidex0[0]);
      sidex[3].set(sidex0[1]);
      sidex[0].set(sidex0[2]);
      sidex[7].set(sidex0[3]);
      // sidex[4].set(sidex0[4]); //dont need
      sidex[1].set(sidex0[5]);
      sidex[8].set(sidex0[6]);
      sidex[5].set(sidex0[7]);
      sidex[2].set(sidex0[8]);

    }

  }else {

    // red
    const side0 = [faces[0].children[8 - index].material.color , faces[0].children[5 - index].material.color , faces[0].children[2 - index].material.color];
    // green
    const side1 = [faces[1].children[0 + index].material.color , faces[1].children[3 + index].material.color , faces[1].children[6 + index].material.color];
    // orange
    const side4 = [faces[4].children[8 - index].material.color , faces[4].children[5 - index].material.color , faces[4].children[2 - index].material.color];
    // white
    const side5 = [faces[5].children[8 - index].material.color , faces[5].children[5 - index].material.color , faces[5].children[2 - index].material.color];

    // red
    const side00 = [side0[0].clone() , side0[1].clone() , side0[2].clone()]; 
    // green
    const side11 = [side1[0].clone() , side1[1].clone() , side1[2].clone()]; 
    // orange
    const side44 = [side4[0].clone() , side4[1].clone() , side4[2].clone()]; 
    //white
    const side55 = [side5[0].clone() , side5[1].clone() , side5[2].clone()]; 

    side4[0].set(side11[0]);
    side4[1].set(side11[1]);
    side4[2].set(side11[2]);
  
    side0[0].set(side44[0]);
    side0[1].set(side44[1]);
    side0[2].set(side44[2]);
  
    side5[0].set(side00[0]);
    side5[1].set(side00[1]);
    side5[2].set(side00[2]);
  
    side1[0].set(side55[0]);
    side1[1].set(side55[1]);
    side1[2].set(side55[2]);

    if (index ==  0) {

      // blue
      const sidex = [faces[2].children[0].material.color , faces[2].children[1].material.color , faces[2].children[2].material.color , faces[2].children[3].material.color , faces[2].children[4].material.color , faces[2].children[5].material.color , faces[2].children[6].material.color , faces[2].children[7].material.color , faces[2].children[8].material.color ];
      const sidex0 = [sidex[0].clone() , sidex[1].clone() , sidex[2].clone() , sidex[3].clone() , sidex[4].clone() , sidex[5].clone() , sidex[6].clone() , sidex[7].clone() , sidex[8].clone() ]; 
      sidex[0].set(sidex0[6]);
      sidex[1].set(sidex0[3]);
      sidex[2].set(sidex0[0]);
      sidex[3].set(sidex0[7]);
      // sidex[4].set(sidex0[0]); //dont need
      sidex[5].set(sidex0[1]);
      sidex[6].set(sidex0[8]);
      sidex[7].set(sidex0[5]);
      sidex[8].set(sidex0[2]);

    }else if (index == "2") {

      // yellow
      const sidex = [faces[3].children[0].material.color , faces[3].children[1].material.color , faces[3].children[2].material.color , faces[3].children[3].material.color , faces[3].children[4].material.color , faces[3].children[5].material.color , faces[3].children[6].material.color , faces[3].children[7].material.color , faces[3].children[8].material.color ];
      const sidex0 = [sidex[0].clone() , sidex[1].clone() , sidex[2].clone() , sidex[3].clone() , sidex[4].clone() , sidex[5].clone() , sidex[6].clone() , sidex[7].clone() , sidex[8].clone() ]; 

      sidex[6].set(sidex0[0]);
      sidex[3].set(sidex0[1]);
      sidex[0].set(sidex0[2]);
      sidex[7].set(sidex0[3]);
      // sidex[4].set(sidex0[4]); //dont need
      sidex[1].set(sidex0[5]);
      sidex[8].set(sidex0[6]);
      sidex[5].set(sidex0[7]);
      sidex[2].set(sidex0[8]);

    }

  }
  
  // بخش مربوط به ترجمه 
  
  let lista = []

  for (let j = 0 ; j < 6 ; j++) {
    
    let listq = []
    for(let i of faces[j].children) {
      let x =  `(${i.material.color.r * 255} , ${i.material.color.g * 255} , ${i.material.color.b * 255})`
      listq.push(x)    
  }
  lista.push(listq)}

  cub[0] = lista[0]
  cub[1] = lista[1]
  cub[2] = lista[2]
  cub[3] = lista[3]
  cub[4] = lista[4]
  cub[5] = lista[5]

}


window.addEventListener('keydown', (event) => { // تبدیل دکمه های کیبورد
  const key = event.key.toLowerCase();
  switch (key) {
    case 'q':
      swapColors('x', 0);
      break;
    case 'w':
      swapColors('x', 1);
      break;
    case 'e':
      swapColors('x', 2);
      break;
    case 'a':
      swapColors('y', 0);
      break;
    case 's':
      swapColors('y', 1);
      break;
    case 'd':
      swapColors('y', 2);
      break;
    case 'z':
      swapColors('z', 0);
      break;
    case 'x':
      swapColors('z', 1);
      break;
    case 'c':
      swapColors('z', 2);
      break;
  }
});

function solve_cub(){

  const startTime = performance.now();  // زمان شروع


  fetch('http://localhost:3000/save-cube', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cub})
  })
  .then(response => response.json())
  .then(data => {
    if (data.steps == 0){
      greetText.textContent = "could not find a solution"

    }else if (data.steps == 1){
      greetText.textContent = "The current cube is currently correct !"
      greetText.style.color = 'green';

    }else {

      let finally_text = "Your solution : "

      for(let i of data.steps.split(' ').map(item => item.trim())) {
        
        if(i[2] == "+"){
          finally_text += `${i[0]}${i[1]}  -  `
        }else {
          finally_text += `${i[0]}${i[1]}  -  ${i[0]}${i[1]}  -  ${i[0]}${i[1]}  -  `
        }

      }

      const endTime = performance.now();  // زمان پایان
      const executionTime = (endTime - startTime) / 1000;
      finally_text += `<br><br>Execution Time : ${executionTime.toFixed(6)} Seconds`
      
      greetText.style.color = 'green';
      greetText.innerHTML  = finally_text

    }

  })
  .catch(error => {

    greetText.style.color = 'red';
    greetText.textContent = "Faild connection to Backend"
  });

  ;
};