export default (M)=>{
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    console.log(instances)
            

    // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
    var collapsibleElem = document.querySelector('.collapsible');
    M.Collapsible.init(collapsibleElem);
}