const picker = (numb) => {
  const make = [
    { name: "Audi", id: 1 },
    { name: "BMW", id: 2 },
    { name: "Ford", id: 3 },
    { name: "Toyota", id: 4 },
    { name: "VW", id: 5 }
  ];

  const model = [
    { name: "A4", id: 1, makeId: 1 },
    { name: "A5", id: 2, makeId: 1 },
    { name: "i3", id: 3, makeId: 2 },
    { name: "320i", id: 4, makeId: 2 },
    { name: "Mondeo", id: 5, makeId: 3 },
    { name: "Fiesta", id: 6, makeId: 3 },
    { name: "Yaris", id: 7, makeId: 4 },
    { name: "Corolla", id: 8, makeId: 4 },
    { name: "Polo", id: 9, makeId: 5 },
    { name: "Passat", id: 10, makeId: 5 }
  ];

  console.log(model.filter((obj) => obj.makeId === numb));
};

picker(2);
