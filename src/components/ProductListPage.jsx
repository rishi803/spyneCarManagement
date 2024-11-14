import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import "./ProductListPage.css";

// Initial car data
const initialCars = [
  {
    id: 1,
    title: "Tesla Model 3",
    description: "Electric sedan with autopilot",
    price: 45000,
    model: "2024",
    image: "https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg",
    carType: "Sedan",
    company: "Tesla",
    dealer: "Tesla Direct",
    tags: ["Electric", "Luxury", "Autopilot"],
    addedBy: "user1",
  },
  {
    id: 2,
    title: "BMW X5",
    description: "Luxury SUV with a powerful engine",
    price: 60000,
    model: "2023",
    image: "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg",
    carType: "SUV",
    company: "BMW",
    dealer: "BMW Authorized Dealer",
    tags: ["Luxury", "SUV", "Powerful"],
    addedBy: "user2",
  },
  {
    id: 3,
    title: "Audi A4",
    description: "Premium sedan with advanced features",
    price: 50000,
    model: "2024",
    image: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg",
    carType: "Sedan",
    company: "Audi",
    dealer: "Audi Dealership",
    tags: ["Premium", "Sedan", "Comfort"],
    addedBy: "user3",
  },
  {
    id: 4,
    title: "Ford Mustang",
    description: "Iconic muscle car with a V8 engine",
    price: 55000,
    model: "2024",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    carType: "Coupe",
    company: "Ford",
    dealer: "Ford Showroom",
    tags: ["Muscle", "V8", "Coupe"],
    addedBy: "user4",
  },
  {
    id: 5,
    title: "Honda Civic",
    description: "Reliable compact car with great fuel efficiency",
    price: 25000,
    model: "2023",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    carType: "Compact",
    company: "Honda",
    dealer: "Honda Authorized Dealer",
    tags: ["Reliable", "Compact", "Fuel Efficiency"],
    addedBy: "user5",
  },
  {
    id: 6,
    title: "Mercedes-Benz G-Class",
    description: "Luxury off-road SUV with iconic design",
    price: 130000,
    model: "2024",
    image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
    carType: "SUV",
    company: "Mercedes-Benz",
    dealer: "Mercedes-Benz Dealership",
    tags: ["Luxury", "SUV", "Off-road"],
    addedBy: "user6",
  },
  {
    id: 7,
    title: "Chevrolet Corvette",
    description: "High-performance sports car with a V8 engine",
    price: 70000,
    model: "2024",
    image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg",
    carType: "Sports",
    company: "Chevrolet",
    dealer: "Chevrolet Dealer",
    tags: ["Sports", "V8", "Performance"],
    addedBy: "user7",
  },
  {
    id: 8,
    title: "Toyota Prius",
    description: "Hybrid vehicle known for fuel efficiency",
    price: 28000,
    model: "2023",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    carType: "Hybrid",
    company: "Toyota",
    dealer: "Toyota Showroom",
    tags: ["Hybrid", "Efficiency", "Eco-friendly"],
    addedBy: "user8",
  },
  {
    id: 9,
    title: "Range Rover Sport",
    description: "Luxury SUV with impressive off-road capability",
    price: 90000,
    model: "2024",
    image: "https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg",
    carType: "SUV",
    company: "Land Rover",
    dealer: "Land Rover Dealership",
    tags: ["Luxury", "SUV", "Off-road"],
    addedBy: "user9",
  },
  {
    id: 10,
    title: "Mazda MX-5 Miata",
    description: "Lightweight roadster with excellent handling",
    price: 30000,
    model: "2024",
    image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
    carType: "Convertible",
    company: "Mazda",
    dealer: "Mazda Dealer",
    tags: ["Convertible", "Roadster", "Handling"],
    addedBy: "user10",
  },
];

const CarListingPage = ({ handleLogout, email }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    model: "",
    image:"",
    carType: "",
    company: "",
    dealer: "",
    tags: [],
  });

  const [cars, setCars] = useState(() => {
    try {
      console.log("emial ", email);
      const storedCars = localStorage.getItem(`car-data-${email}`);
      if (storedCars) {
        return JSON.parse(storedCars);
      } else {
        // Initialize local storage with the cars prop if not already set
        localStorage.setItem(`car-data-${email}`, JSON.stringify(initialCars));
        return initialCars;
      }
    } catch (error) {
      console.error("Error accessing local storage:", error);
      setCars(initialCars);
    }
  });

  useEffect(() => {
    localStorage.setItem(`car-data-${email}`, JSON.stringify(cars));
  }, [cars, email]);

  console.log(cars);
  const filteredCars =
    cars && cars.length > 0
      ? cars.filter(
          (car) =>
            car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.carType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
      : [];

  const handleAddCar = (e) => {
    e.preventDefault();
    const newCar = {
      ...formData,
      id: Date.now(),
      addedBy: email,
      image: [
        "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg",
        "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg",
        "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
        "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg",
        "https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg"
      ][Math.floor(Math.random() * 5)],
    };

   

    const updatedCars = [...cars, newCar];
    console.log("up ",updatedCars)
    setCars(updatedCars);
    localStorage.setItem(`car-data-${email}`, JSON.stringify(updatedCars));
    setIsAddModalOpen(false);
    setFormData({
      title: "",
      description: "",
      price: "",
      model: "",
      images: [],
      carType: "",
      company: "",
      dealer: "",
      tags: [],
    });
  };

  const handleUpdateCar = (e) => {
    e.preventDefault();
    const updatedCars = cars.map((car) =>
      car.id === selectedCar.id ? { ...car, ...formData } : car
    );
    setCars(updatedCars);
    localStorage.setItem(`car-data-${email}`, JSON.stringify(updatedCars));
    setIsAddModalOpen(false);
    setIsEditing(false);
    setSelectedCar(null);
  };

  const handleDelete = () => {
    const updatedCars = cars.filter((car) => car.id !== selectedCar.id);
    setCars(updatedCars);
    localStorage.setItem(`car-data-${email}`, JSON.stringify(updatedCars));
    setIsDeleteModalOpen(false);
    setSelectedCar(null);
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData(car);
    setIsEditing(true);
    setIsAddModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with search and add button */}
      <div className="search-and-actions-container">
        <div className="search-input-container">
          <Search className=" h-5 w-5 search-icon" />
          <input
            type="text"
            placeholder="Search cars..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="action-buttons-container">
          <button
            onClick={() => {
              setIsEditing(false);
              setIsAddModalOpen(true);
            }}
            className="add-car-button"
          >
            <Plus className="h-5 w-5" />
            Add Car
          </button>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>
      </div>

      {/* Car grid */}
      <div className="cars-grid-container">
        {cars &&
          filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.title} className="car-image" />
              <div className="car-card-body">
                <div className="car-card-header">
                  <h3 className="car-title">{car.title}</h3>
                  <div className="car-card-actions">
                    <button
                      onClick={() => handleEdit(car)}
                      className="car-edit-button"
                    >
                      <Edit2 className="car-edit-icon" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setIsDeleteModalOpen(true);
                      }}
                      className="car-delete-button"
                    >
                      <Trash2 className="car-delete-icon" />
                    </button>
                  </div>
                </div>
                <p className="car-description">{car.description}</p>
                <div className="car-tags">
                  {car.tags.map((tag, index) => (
                    <span key={index} className="car-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedCar(car);
                    setIsViewModalOpen(true);
                  }}
                  className="car-view-button"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Add/Edit Car Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">
                  <span id="modal-title">
                    {isEditing ? "Edit Car" : "Add New Car"}
                  </span>
                </h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="close-button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form
                id="carForm"
                onSubmit={isEditing ? handleUpdateCar : handleAddCar}
                className="form-container"
              >
                <div className="input-group">
                  <label className="floating-label">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="form-input"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="floating-label">Description</label>
                  <textarea
                    placeholder="Description"
                    className="form-input"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <div className="input-group">
                  <label className="floating-label">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    className="form-input"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="floating-label">Model</label>
                  <input
                    type="text"
                    placeholder="Model"
                    className="form-input"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="floating-label">Car Type</label>
                  <input
                    type="text"
                    placeholder="Car Type"
                    className="form-input"
                    value={formData.carType}
                    onChange={(e) =>
                      setFormData({ ...formData, carType: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="floating-label">Company</label>
                  <input
                    type="text"
                    placeholder="Company"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="floating-label">Dealer</label>
                  <input
                    type="text"
                    placeholder="Dealer"
                    className="form-input"
                    value={formData.dealer}
                    onChange={(e) =>
                      setFormData({ ...formData, dealer: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="floating-label">Tags</label>
                  <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    className="form-input"
                    value={formData.tags.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value
                          .split(",")
                          .map((tag) => tag.trim()),
                      })
                    }
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  {isEditing ? "Update Car" : "Add Car"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Car Details Modal */}
      {isViewModalOpen && selectedCar && (
        <div className="modal-overlay">
          <div className="view-modal-content">
            <div className="view-modal-body">
              <div className="view-modal-header">
                <h2 className="view-modal-title">{selectedCar.title}</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="view-close-button"
                >
                  <X className="view-close-icon" />
                </button>
              </div>
              <img
                src={selectedCar.image}
                alt={selectedCar.title}
                className="view-car-image"
              />
              <div className="view-car-details">
                <p>
                  <strong>Price:</strong> ${selectedCar.price}
                </p>
                <p>
                  <strong>Model:</strong> {selectedCar.model}
                </p>
                <p>
                  <strong>Description:</strong> {selectedCar.description}
                </p>
                <p>
                  <strong>Car Type:</strong> {selectedCar.carType}
                </p>
                <p>
                  <strong>Company:</strong> {selectedCar.company}
                </p>
                <p>
                  <strong>Dealer:</strong> {selectedCar.dealer}
                </p>
                <div className="view-tags-container">
                  <strong>Tags:</strong>
                  {selectedCar.tags.map((tag, index) => (
                    <span key={index} className="view-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <div className="delete-modal-body">
              <h2 className="delete-modal-title">Are you sure?</h2>
              <p className="delete-modal-description">
                This action cannot be undone. This will permanently delete the
                car listing.
              </p>
              <div className="delete-modal-actions">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="delete-modal-cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="delete-modal-delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarListingPage;
