import React, { Component } from "react";
import Swal from 'sweetalert2'
import customersService from "../../Services/Customers/customers";
import documentTypesService from "../../Services/DocumentTypes/documentTypes";
import "./css/Content.css";
import ViewModes from "../../enums/ViewModes";

// Import the Grid component.
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import { NumericTextBox, Input } from '@progress/kendo-react-inputs';
// You can import style files in ./App.js and add global styles in ./App.css
import '@progress/kendo-theme-default/dist/all.css';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: ViewModes.List,
      loading: false,
      customers: [],
      documentTypes: [],
      customer: {
        _id: "",
        documentNumber: 0,
        firstName: "",
        secondName: "",
        lastName: "",
        secondLastName: "",
        adress: "",
        phone: 0,
        documentType: ""
      },
      filter: {
        logic: "and",
        filters: []
      }
    };
  }

  componentDidMount() {
    this.getCustomer();
    this.getDocumentTypes();
  }

  hundleOnChangeItem = (e) => {
    switch (e.target.name) {
      case "documentNumber":
        this.setState({ documentNumber: e.target.value });
        break;
      case "firstName":
        this.setState({ firstName: e.target.value });
        break;
      case "secondName":
        this.setState({ secondName: e.target.value });
        break;
      case "lastName":
        this.setState({ lastName: e.target.value });
        break;
      case "secondLastName":
        this.setState({ secondLastName: e.target.value });
        break;
      case "adress":
        this.setState({ adress: e.target.value });
        break;
      case "phone":
        this.setState({ phone: e.target.value });
        break;
      case "documentType":
        this.setState({ documentType: e.target.value });
        break;

      default:
        break;
    }
  }

  getDocumentTypes = () => {
    this.setState({ loading: true });
    documentTypesService.getDocumentTypes().then(res => {
      this.setState({
        documentTypes: res.data.documentTypes
      });
    });
  };

  getCustomer = () => {
    this.setState({ loading: true });
    customersService.getCustomer().then(res => {
      this.setState({
        customers: res.data.customers
      });
    });
  };

  hundleNewCustomerClick = (e) => {
    this.setState({
      viewMode: ViewModes.New
    });
  }

  hundleEditCustomerClick = (e) => {
    var id = e;
    var customerEdit = this.state.customers.filter(c => c._id === id)[0];
    this.setState({
      viewMode: ViewModes.Edit,
      _id: customerEdit._id,
      documentNumber: customerEdit.documentNumber,
      firstName: customerEdit.firstName,
      secondName: customerEdit.secondName,
      lastName: customerEdit.lastName,
      secondLastName: customerEdit.secondLastName,
      adress: customerEdit.adress,
      phone: customerEdit.phone,
      documentType: customerEdit.documentType
    });
  }

  hundleDeleteCustomerClick = (e) => {
    Swal({
      title: 'Estás seguro?',
      text: "Al eliminar este registro no hay forma de recuperarlo posteriormente.",
      type: 'question',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-check"></i>',
      confirmButtonClass: 'btn btn-lg btn-outline-success rounded-circle m-1',
      focusConfirm: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: '<i class="fa fa-power-off"></i>',
      cancelButtonClass: 'btn btn-lg btn-outline-danger btn-shadow-danger rounded-circle m-1'
    })
    .then((result) => {
      if (result.value) {
        customersService
        .deleteCustomer(e)
        .then(res => {
          this.getCustomer();
        })
        .catch(err => console.log(err));
      }
    });
  }

  hundleSaveCustomerClick = (e) => {
    var customerSave = {
      _id: this.state._id,
      documentNumber: this.state.documentNumber,
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      lastName: this.state.lastName,
      secondLastName: this.state.secondLastName,
      adress: this.state.adress,
      phone: this.state.phone,
      documentType: this.state.documentType._id
    };

    if (this.state.viewMode === "Edit") {
      customersService
        .putCustomer(customerSave)
        .then(res => {
          this.cleanCustomer();
          Swal({
            title: "Ok...!!", 
            text: "Registro actualizado", 
            type: "success",
            timer: 2000,
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      customersService
        .postCustomer(customerSave)
        .then(res => {
          Swal({
            title: "Ok...!!", 
            text: "Registro guardado", 
            type: "success",
            timer: 2000,
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  cleanCustomer() {
    this.setState({
      viewMode: ViewModes.List,
      _id: "",
      documentNumber: "",
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      adress: "",
      phone: "",
      documentType: ""
    });
    this.getCustomer();
  }

  hundleCancelCustomerClick = () => {
    this.cleanCustomer();
  }

  render() {
    return (
      <div className="Content">
        <div className="container">
          {(this.state.viewMode === ViewModes.List && this.state.customers) && (
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-8 text-right mt-3">
              </div>
              <div className="col-md-2" />
              <div className="col-md-1" />
              <div className="col-md-10">
                <div className="mt-1">
                  <Grid
                    style={{ height: '400px' }}
                    filterable={true}
                    sortable={true}
                    pageable={true}
                    data={filterBy(this.state.customers, this.state.filter)}
                    filter={this.state.filter}
                    onFilterChange={(e) => {
                      this.setState({
                        filter: e.filter
                      });
                    }}>
                    <GridToolbar>
                      <div className="row">
                      <div className="col-md-12 text-right">
                        <button className="btn btn-success" onClick={this.hundleNewCustomerClick}><i className="fas fa-plus-square"></i></button>
                      </div>
                      </div>
                    </GridToolbar>
                    <GridColumn field="documentType.name" title="Numero de Documento" width="200px" />
                    <GridColumn field="documentNumber" title="Numero de Documento" width="150px" />
                    <GridColumn field="firstName" title="Primer Nombre" width="150px" />
                    <GridColumn field="lastName" title="Primer Apellido" width="150px" />
                    <GridColumn cell={(props) => (
                      <td>
                        <button id={props.dataItem._id}
                          className="btn btn-warning" onClick={() => this.hundleEditCustomerClick(props.dataItem._id)}><i className="fas fa-pencil-alt"></i></button>
                        <button id={props.dataItem._id}
                          className="btn btn-danger" onClick={() => this.hundleDeleteCustomerClick(props.dataItem._id)}><i className="fas fa-trash-alt"></i></button>
                      </td>
                    )} width="150px" />
                  </Grid>
                </div>
              </div>
            </div>
          )}

          {this.state.viewMode !== ViewModes.List && (
            <form className="k-form" onSubmit={this.hundleSaveCustomerClick}>
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8">
                  <div className="card mt-3">
                    <div className="card-header">Clientes</div>
                    <div className="card-body">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="documentType">
                                Tipo de Documento
                            </label>
                              <ComboBox
                                required={true}
                                data={this.state.documentTypes}
                                className="form-control"
                                id="documentType"
                                name="documentType"
                                textField="name"
                                dataItemKey="_id"
                                value={this.state.documentType}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="documentNumber">
                                Número de Documento
                            </label>
                              <Input
                                required={true}
                                type="text"
                                className="form-control"
                                id="documentNumber"
                                name="documentNumber"
                                placeholder="Numero de Documento"
                                value={this.state.documentNumber}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="firstName">Primer Nombre</label>
                              <Input
                                required={true}
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                placeholder="Primer Nombre"
                                value={this.state.firstName}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="secondName">Segundo Nombre</label>
                              <Input
                                type="text"
                                className="form-control"
                                id="secondName"
                                name="secondName"
                                placeholder="Segundo Nombre"
                                value={this.state.secondName}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="lastName">Primer Apellido</label>
                              <Input
                                required={true}
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder="Primer Apellido"
                                value={this.state.lastName}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="secondLastName">
                                Segundo Apellido
                            </label>
                              <Input
                                type="text"
                                className="form-control"
                                id="secondLastName"
                                name="secondLastName"
                                placeholder="Segundo Apellido"
                                value={this.state.secondLastName}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="adress">Dirección</label>
                              <Input
                                required={true}
                                type="text"
                                className="form-control"
                                id="adress"
                                name="adress"
                                placeholder="Dirección"
                                value={this.state.adress}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="phone">Teléfono</label>
                              <NumericTextBox
                                required={true}
                                width="100%"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Teléfono"
                                value={(this.state.phone !== "" && this.state.phone) ? parseInt(this.state.phone) : null}
                                onChange={this.hundleOnChangeItem}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit"
                        className="btn btn-success">
                        Guardar
                      </button>
                      <button className="btn btn-danger"
                        onClick={this.hundleCancelCustomerClick}
                      >
                        Cancelar
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Content;
