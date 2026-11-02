const memes=[
 ['Когда узнал название препарата','И теперь замечаешь его в каждой аптеке','scene0'],
 ['Я: сегодня лягу пораньше','Также я в 02:17: ещё одну тему и всё','scene1'],
 ['Выучил сложное название','Произнёс без запинки. День уже удался','scene2'],
 ['Открыл конспект на пять минут','Очнулся среди трёх учебников и семи вкладок','scene3'],
 ['Когда наставник говорит:','«Хороший вопрос, давай разберём»','scene4'],
 ['Я на первой практике','Киваю уверенно. Записываю абсолютно всё','scene5'],
 ['Когда нашёл нужный товар сам','Внутри — маленькая церемония награждения','scene6'],
 ['Группа: «Кто понял эту тему?»','Я: отправляю мем. Помогаю как могу','scene7'],
 ['Когда друг тоже учится на фармацевта','Наконец-то мои шутки не надо объяснять','scene8'],
 ['До практики: «Как тут всё запомнить?»','После: уже знаешь, на какой полке искать','scene9'],
 ['Когда сдал сложный зачёт','Официально разрешаю себе ничего не делать','scene10'],
 ['«Последний вопрос перед перерывом»','И ещё пять действительно последних','scene11'],
 ["Пришёл за браслетом.", "Ушёл с планом на первую зарплату.", "pdf0", "pdf-1.webp"],
 ["Я: просто посмотрю вакансии.", "Также я через пять минут: «А когда на собеседование?»", "pdf1", "pdf-2.webp"],
 ["Мой нишевый талант:", "произносить названия, которые остальные боятся читать.", "pdf2", "pdf-3.webp"],
 ["Когда пока не знаешь ответ,", "но знаешь, у кого спросить.", "pdf3", "pdf-4.webp"],
 ["Когда спросил в пятый раз,", "а тебе снова спокойно объяснили.", "pdf4", "pdf-5.webp"],
 ["Первая зарплата по специальности.", "Новый уровень самостоятельности.", "pdf5", "pdf-6.webp"],
 ["Я: учу фармакологию.", "Мозг: помнишь тот неловкий разговор пятилетней давности?", "pdf6", "pdf-7.webp"],
 ["Когда ответ вспомнился", "сразу после того, как сдал работу.", "pdf7", "pdf-8.webp"],
 ["Я: с первой зарплаты начну откладывать.", "Корзина в магазине: интересный план.", "pdf8", "pdf-9.webp"],
 ["Когда покупатель сказал: «Спасибо, вы мне очень помогли».", "Всё. День уже хороший.", "pdf9", "pdf-10.webp"],
 ["Когда в рабочем чате написали «спасибо»,", "и это тебе.", "pdf10", "pdf-11.webp"],
 ["Я в начале обучения: ?", "Я через месяц: сейчас объясню.", "pdf11", "pdf-12.webp"],
 ["Когда разобрался с первого раза.", "Аж сам себя зауважал.", "pdf12", "pdf-13.webp"],
 ["Я: не буду волноваться перед первой сменой.", "Также я: репетирую «здравствуйте».", "pdf13", "pdf-14.webp"],
 ["Когда твой диплом наконец-то начал", "работать вместе с тобой.", "pdf14", "pdf-15.webp"],
 ["Когда зашёл «просто спросить»,", "а вышел с новым сюжетным поворотом.", "pdf15", "pdf-16.webp"],
 ["Когда коллега понимает тебя с одного взгляда.", "Командный вайб.", "pdf16", "pdf-17.webp"],
 ["Когда сложное название получилось произнести", "без внутренней загрузки.", "pdf17", "pdf-18.webp"]
];
const canvas=document.querySelector('#meme'),ctx=canvas.getContext('2d'),draw=document.querySelector('#draw'),status=document.querySelector('#status');
let current=null,bag=[],last=-1;const images={};
function loadImage(name,path){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>{images[name]=im;res()};im.onerror=rej;im.src=path})}
function lines(text,maxWidth,size){ctx.font=`800 ${size}px Arial`;const out=[];let line='';for(const word of text.split(' ')){const next=line?line+' '+word:word;if(ctx.measureText(next).width>maxWidth&&line){out.push(line);line=word}else line=next}if(line)out.push(line);return out}
function textBlock(text,y,size,color,maxLines){let ls=lines(text,920,size);while(ls.length>maxLines&&size>28)ls=lines(text,920,--size);ctx.fillStyle=color;ctx.font=`800 ${size}px Arial`;ctx.textAlign='center';for(const line of ls){ctx.fillText(line,540,y);y+=size*1.16}return y}
function paint(item){ctx.fillStyle='#ffffff';ctx.fillRect(0,0,1080,1080);ctx.fillStyle='#007c4d';ctx.fillRect(0,0,1080,12);ctx.drawImage(images.logo,70,40,315,126);ctx.font='bold 22px Arial';ctx.fillStyle='#648070';ctx.textAlign='right';ctx.fillText('ФАРМ-МЕМ',1010,110);textBlock(item[0],225,55,'#007c4d',2);const im=images[item[2]];const scale=Math.min(940/im.width,520/im.height),w=im.width*scale,h=im.height*scale;ctx.drawImage(im,(1080-w)/2,320+(520-h)/2,w,h);textBlock(item[1],910,48,'#153e30',2);ctx.fillStyle='#ff7918';ctx.fillRect(430,1030,220,7);canvas.setAttribute('aria-label',item[0]+'. '+item[1]);}
function refill(){bag=memes.map((_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}if(bag[bag.length-1]===last)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]]}
function next(){if(!bag.length)refill();current=bag.pop();last=current;paint(memes[current]);document.querySelector('#label').textContent='ТВОЯ ПОРЦИЯ ФАРМ-ЮМОРА';document.querySelector('#actions').hidden=false;draw.textContent='Ещё мем ↻';status.textContent='Сохрани себе или отправь в чат группы';}
function blob(){return new Promise((res,rej)=>canvas.toBlob(b=>b?res(b):rej(new Error('PNG недоступен')),'image/png'))}
async function download(){try{const b=await blob(),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=`economnaya-meme-${current+1}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);status.textContent='Если картинка открылась в новой вкладке — удерживай её, чтобы сохранить'}catch{status.textContent='Не удалось скачать. Попробуй ещё раз'}}
draw.addEventListener('click',next);document.querySelector('#download').addEventListener('click',download);
document.querySelector('#share').addEventListener('click',async()=>{try{const file=new File([await blob()],`pharm-meme-${current+1}.png`,{type:'image/png'});if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'Фарм-мем от Экономной аптеки'})}else{await download();status.textContent='Скачай картинку и прикрепи её в любом мессенджере'}}catch(e){if(e.name!=='AbortError')status.textContent='Попробуй скачать картинку и отправить её вручную'}});
Promise.all([loadImage('hippo','assets/hippo.png'),loadImage('squirrel','assets/squirrel.png'),loadImage('logo','assets/logo.png'),...memes.map((m,i)=>loadImage(m[2],`assets/scenes/${m[3]||`scene-${i+1}.webp`}`))]).then(()=>{paint(['Твой фарм-мем уже ждёт','Нажми «Выдать мем» — узнаешь какой','hippo']);draw.disabled=false;draw.textContent='Выдать мем →';status.textContent='Без регистрации. Просто немного фарм-юмора'}).catch(()=>{status.textContent='Картинки не загрузились. Проверь интернет и обнови страницу';draw.textContent='Обнови страницу'});
