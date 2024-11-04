import React, { useState } from 'react';
import { Key, Building2, Users } from 'lucide-react';
import type { Tenant, Apartment, Key as KeyType } from './types';
import { DataTable } from './components/DataTable';
import { Form } from './components/Form';

function App() {
  const [activeTab, setActiveTab] = useState<'tenants' | 'apartments' | 'keys'>('tenants');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [keys, setKeys] = useState<KeyType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSubmit = (data: any) => {
    const itemWithId = { ...data, id: editingItem?.id || generateId() };
    
    if (activeTab === 'tenants') {
      itemWithId.apartmentIds = editingItem?.apartmentIds || [];
      itemWithId.keyIds = editingItem?.keyIds || [];
      if (editingItem) {
        setTenants(tenants.map(t => t.id === editingItem.id ? itemWithId : t));
      } else {
        setTenants([...tenants, itemWithId]);
      }
    } else if (activeTab === 'apartments') {
      itemWithId.tenantIds = editingItem?.tenantIds || [];
      itemWithId.keyIds = editingItem?.keyIds || [];
      if (editingItem) {
        setApartments(apartments.map(a => a.id === editingItem.id ? itemWithId : a));
      } else {
        setApartments([...apartments, itemWithId]);
      }
    } else {
      itemWithId.tenantIds = editingItem?.tenantIds || [];
      itemWithId.apartmentIds = editingItem?.apartmentIds || [];
      if (editingItem) {
        setKeys(keys.map(k => k.id === editingItem.id ? itemWithId : k));
      } else {
        setKeys([...keys, itemWithId]);
      }
    }
    
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (activeTab === 'tenants') {
      setTenants(tenants.filter(t => t.id !== id));
    } else if (activeTab === 'apartments') {
      setApartments(apartments.filter(a => a.id !== id));
    } else {
      setKeys(keys.filter(k => k.id !== id));
    }
  };

  const formFields = {
    tenants: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
      { name: 'personalNumber', label: 'Personal Number', type: 'text' },
    ],
    apartments: [
      { name: 'street', label: 'Street', type: 'text' },
      { name: 'number', label: 'Number', type: 'text' },
      { name: 'apartmentNumber', label: 'Apartment Number', type: 'text' },
      { name: 'floor', label: 'Floor', type: 'text' },
      { name: 'postalCode', label: 'Postal Code', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
    ],
    keys: [
      { name: 'type', label: 'Type', type: 'text' },
      { name: 'number', label: 'Number', type: 'text' },
      { name: 'amount', label: 'Amount', type: 'number' },
    ],
  };

  const columns = {
    tenants: [
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'email', label: 'Email' },
      { key: 'phoneNumber', label: 'Phone' },
    ],
    apartments: [
      { key: 'street', label: 'Street' },
      { key: 'number', label: 'Number' },
      { key: 'apartmentNumber', label: 'Apt #' },
      { key: 'city', label: 'City' },
    ],
    keys: [
      { key: 'type', label: 'Type' },
      { key: 'number', label: 'Number' },
      { key: 'amount', label: 'Amount' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'tenants', label: 'Tenants', icon: Users },
                { id: 'apartments', label: 'Apartments', icon: Building2 },
                { id: 'keys', label: 'Keys', icon: Key },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`
                    flex-1 px-4 py-4 text-center border-b-2 text-sm font-medium
                    ${activeTab === id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h1>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsFormOpen(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add New
              </button>
            </div>

            <DataTable
              data={activeTab === 'tenants' ? tenants : activeTab === 'apartments' ? apartments : keys}
              columns={columns[activeTab]}
              onEdit={(item) => {
                setEditingItem(item);
                setIsFormOpen(true);
              }}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      {isFormOpen && (
        <Form
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
          fields={formFields[activeTab]}
          initialData={editingItem}
          title={`${editingItem ? 'Edit' : 'Add'} ${activeTab.slice(0, -1)}`}
        />
      )}
    </div>
  );
}

export default App;