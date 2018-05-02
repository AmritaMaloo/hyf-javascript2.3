document.querySelector(".tosubmit").addEventListener('click', getData);
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const p = document.querySelector('p');
h2.style.display = 'none';
h3.style.display = 'none';

function fetchJSONData(url, callbackFn) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
        console.log("Data loaded.");
        const data = JSON.parse(xhr.responseText);
        callbackFn(data);
    });
    xhr.open('GET', url);
    xhr.send();
}

function getData() {
    const input = document.querySelector('input');
    const url = "https://api.github.com/search/repositories?q=user:HackYourFuture+" + (input.value);
    
    fetchJSONData(url, function(data) {
        p.innerHTML = "";
        document.querySelector('.repolinks').innerHTML = "";
        document.querySelector('.commitList').innerHTML = "";
        h2.innerHTML = "";
        h3.innerHTML = "";

        if(data.total_count === 0)
            p.innerHTML = "please enter some valid data";
        else {
            
            for(const obj of data.items) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#">${obj.url}</a>`;
                document.querySelector('.repolinks').appendChild(li); 
                         
            }
                
        }
        const list = document.querySelectorAll('.repolinks li');
        console.log(list);
        for(let i = 0; i < list.length; i++) {
            list[i].addEventListener('click', commitDetails);
        }
        
        
    
        input.value = "" ;     
    });
    

}



function commitDetails() {

    
    h2.innerHTML = "";
    h3.innerHTML = "";
    
    
    const array = this.innerText.split('/');
    console.log(array[array.length-1]);
    
    h2.innerHTML = `<a href="https://github.com/HackYourFuture/${array[array.length-1]}" target="_blank">${array[array.length-1]}</a>`;
    h3.innerHTML = "Commits";
    h2.style.display = 'block';
    h3.style.display = 'block';
    const url = this.innerText + "/commits";
    document.querySelector('.commitList').innerHTML = "";
    fetchJSONData(url, function(data) {
        for(const eachobj of data) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${eachobj.author.html_url}" target="_blank"><img src="${eachobj.author.avatar_url} alt="avatar" width="50" height="50"></a><span><a href="${eachobj.author.html_url}" target="_blank">${eachobj.commit.author.name}</a></span><br>${eachobj.commit.author.date}<br>${eachobj.commit.message}`
            document.querySelector('.commitList').appendChild(li); 
        }
         
    });
}
    
    
