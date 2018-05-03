/**
 *
 * @author: Huy Vo
 * @description: Composite Design Pattern
 */
function CompositeController() {
    console.log("composite controller constructor");
    this.children = [];
}

CompositeController.prototype.add = function (action) {
    this.children.push(action);
};

CompositeController.prototype.update = function () {
    console.log("composite controller update");
    for(var i = 0; i < this.children.length; i++ ){
        this.children[i].update(); // execute
    }
};