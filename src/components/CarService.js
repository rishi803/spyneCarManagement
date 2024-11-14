 const CarService = {
    getAllCars() {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      const user = JSON.parse(localStorage.getItem('user'));
      return cars.filter(car => car.userId === user.id);
    },
  
    getCarById(id) {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      return cars.find(car => car.id === id);
    },
  
    createCar(carData) {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      const user = JSON.parse(localStorage.getItem('user'));
      const newCar = {
        ...carData,
        id: Date.now().toString(),
        userId: user.id,
        createdAt: new Date().toISOString()
      };
      cars.push(newCar);
      localStorage.setItem('cars', JSON.stringify(cars));
      return newCar;
    },
  
    updateCar(id, carData) {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      const index = cars.findIndex(car => car.id === id);
      if (index !== -1) {
        cars[index] = { ...cars[index], ...carData };
        localStorage.setItem('cars', JSON.stringify(cars));
        return cars[index];
      }
      return null;
    },
  
    deleteCar(id) {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      const filteredCars = cars.filter(car => car.id !== id);
      localStorage.setItem('cars', JSON.stringify(filteredCars));
    },
  
    searchCars(query) {
      const cars = this.getAllCars();
      const searchTerm = query.toLowerCase();
      return cars.filter(car => 
        car.title.toLowerCase().includes(searchTerm) ||
        car.description.toLowerCase().includes(searchTerm) ||
        car.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
  };

  export default CarService;