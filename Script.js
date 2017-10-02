// Class to represent a row in the seat reservations grid
function ItemAdd(amount,initialitem) {
    var self = this;
    self.item = ko.observable(initialitem);
    self.lifetime = self.item().lifetime;
    self.amount = ko.observable(amount);
    self.load = self.item().load;
    self.areataken = ko.computed(function() {
         return ((self.amount() * self.item().lifetime) / self.item().load);  
          });   
    self.formattedArea = ko.computed(function() {
         var area = self.areataken();
         return area ? area.toFixed(2) : "None";
    });
}

function EquipmentAdd(amount,initialequip) {
    var self = this;
    self.equip = ko.observable(initialequip);
    self.type = self.equip().type;
    self.length = self.equip().length;
    self.width = self.equip().width;
    self.height = self.equip().height;
    self.amount1 = ko.observable(amount);
    self.areaPerUnit = ko.computed(function() {
         return ((self.equip().length * self.equip().width)) / 1000000;  
          });   
    self.area = ko.computed(function() {
        var a = self.areaPerUnit();
         return (self.amount1() * a);  
          });   
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;
    // Non-editable catalog data - would come from the server
    self.availableitems = [
        { itemName: "Сухари панировочные", lifetime: 5, load: 100},
        { itemName: "Мука пшеничная", lifetime: 5, load: 500},
        { itemName: "Перец черный молотый", lifetime: 5, load: 100},
        { itemName: "Соль поваренная", lifetime: 5, load: 600},
        { itemName: "Хлеб пшеничный", lifetime: 2, load: 200},
        { itemName: "Уксус 3%-ный", lifetime: 5, load: 220 }
    ]; 
    self.availableequipment= [
        { equipmentName: "Подтоварник",type: 'ПТ-2', length: 1050,width: 840,height: 280},
        { equipmentName: "Стеллаж",type:'СПС-1', length: 1470,width: 840,height: 2000},
    ];    

    // Editable data
    self.items = ko.observableArray([
        new ItemAdd(0,self.availableitems[0]),
        new ItemAdd(0,self.availableitems[1])
    ]);
    self.equips = ko.observableArray([
    new EquipmentAdd(0,self.availableequipment[0]),
    new EquipmentAdd(0,self.availableequipment[1])
    ]);
    // Operations
    self.addItem = function() {
        self.items.push(new ItemAdd(0,self.availableitems[0]));
                        }
     self.addEquip = function() {
        self.equips.push(new EquipmentAdd(0,self.availableequipment[0]));
        console.log(self.equips()[2]);
                        }
    self.deleteItem = function(item) {
        self.items.remove(item);
                }
    self.deleteEquip = function(equip) {
        self.equips.remove(equip);
                }

    // Computed data
    self.totalArea = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.items().length; i++)
           total += self.items()[i].areataken();
       return total;
    });
    self.totalEquipArea = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.equips().length; i++)
           total += self.equips()[i].area();
       return total;
    });
}

ko.applyBindings(new ReservationsViewModel());