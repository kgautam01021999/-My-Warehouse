import React, { useState } from "react";
import { Grid, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { createPortal } from "react-dom";
import WarehouseDetailsModal from "./WarehouseDetailsModal";
const warehousesData = [
  {
    "name" : "Warehouse-165",
    "code" : "W-00001",
    "id" : 1,
    "city": "Delhi",
    "space_available": 1234,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-32",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-276",
    "code" : "W-00002",
    "id" : 2,
    "city": "Chennai",
    "space_available": 124,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-3039",
    "code" : "W-00003",
    "id" : 3,
    "city": "Indore",
    "space_available": 134,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-324",
    "code" : "W-00004",
    "id" : 4,
    "city": "Chennai",
    "space_available": 12,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-5454",
    "code" : "W-00005",
    "id" : 5,
    "city": "Chennai",
    "space_available": 1243434,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-4345",
    "code" : "W-00006",
    "id" : 6,
    "city": "Chennai",
    "space_available": 1,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-3455",
    "code" : "W-00007",
    "id" : 7,
    "city": "Mumbai",
    "space_available": 4,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-2",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-23455",
    "code" : "W-00008",
    "id" : 8,
    "city": "Bangalore",
    "space_available": 3456,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-21",
    "is_registered" : true,
    "is_live" : true
  },
  {
    "name" : "Warehouse-6457",
    "code" : "W-00009",
    "id" : 9,
    "city": "Bangalore",
    "space_available": 1234545,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-32456",
    "code" : "W-000010",
    "id" : 10,
    "city": "Guwahati",
    "space_available": 121234,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : true
  },
  {
    "name" : "Warehouse-3245678",
    "code" : "W-000011",
    "id" : 11,
    "city": "Delhi",
    "space_available": 98,
    "type" : "Leasable Space",
    "cluster" : "cluster-v-2",
    "is_registered" : true,
    "is_live" : false
  },
  {
    "name" : "Warehouse-4567",
    "code" : "W-000012",
    "id" : 12,
    "city": "Indore",
    "space_available": 97,
    "type" : "Warehouse Service",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : true
  },
  {
    "name" : "Warehouse-458",
    "code" : "W-000013",
    "id" : 13,
    "city": "Delhi",
    "space_available": 654,
    "type" : "Leasable Space",
    "cluster" : "cluster-a-1",
    "is_registered" : true,
    "is_live" : false
  }
]

export default function App() {
  const [filters, setFilters] = useState({
    cityName: "",
    clusterName: "",
    spaceAvailableLimit: "",
  });
 

  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehousesData);
  const handleEditWarehouse = (editedWarehouse) => {
    // Handle the edited warehouse data (e.g., send a request to update the data)
    // You can update the data in filteredWarehouses or warehousesData as needed
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = warehousesData.filter((warehouse) => {
      const cityName = warehouse.city.toLowerCase();
      const clusterName = warehouse.cluster.toLowerCase();
      const spaceAvailable = warehouse.space_available.toString();

      const filterCity = filters.cityName.toLowerCase();
      const filterCluster = filters.clusterName.toLowerCase();
      const filterSpaceAvailable = filters.spaceAvailableLimit.toString();

      return (
        (filterCity === "" || cityName.includes(filterCity)) &&
        (filterCluster === "" || clusterName.includes(filterCluster)) &&
        (filterSpaceAvailable === "" || spaceAvailable >= filterSpaceAvailable)
      );
    });

    setFilteredWarehouses(filtered);
  };

  const resetFilters = () => {
    setFilters({
      cityName: "",
      clusterName: "",
      spaceAvailableLimit: "",
    });
    setFilteredWarehouses(warehousesData);
  };

  const openWarehouseDetailsModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  const closeWarehouseDetailsModal = () => {
    setSelectedWarehouse(null);
  };

  const modalRoot = document.getElementById("modal-root");

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Warehouse Listing</h1>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="City"
            name="cityName"
            value={filters.cityName}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Cluster"
            name="clusterName"
            value={filters.clusterName}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Space Available"
            name="spaceAvailableLimit"
            value={filters.spaceAvailableLimit}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="contained" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Grid>
      </Grid>
      <hr />
      <h2>Filtered Warehouses</h2>
      <Grid container spacing={2}>
        {filteredWarehouses.map((warehouse) => (
          <Grid item xs={12} md={6} lg={4} key={warehouse.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{warehouse.name}</Typography>
                <Typography variant="body2">
                  <b>City:</b> {warehouse.city}
                </Typography>
                <Typography variant="body2">
                  <b>Cluster:</b> {warehouse.cluster}
                </Typography>
                <Typography variant="body2">
                  <b>Space Available:</b> {warehouse.space_available}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => openWarehouseDetailsModal(warehouse)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedWarehouse && modalRoot
        ? createPortal(
            <WarehouseDetailsModal
              isOpen={true}
              onClose={closeWarehouseDetailsModal}
              warehouse={selectedWarehouse}
              onEdit={handleEditWarehouse}
            />,
            modalRoot
          )
        : null}
    </div>
  );
}