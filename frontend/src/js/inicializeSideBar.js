export default (M)=>{
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems,{edge:'right'});
    
            

    // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
    var collapsibleElem = document.querySelector('.collapsible');
    M.Collapsible.init(collapsibleElem);
}