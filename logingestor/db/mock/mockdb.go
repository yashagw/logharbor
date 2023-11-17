// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/yashagw/logingestor/db (interfaces: Provider)

// Package mockdb is a generated GoMock package.
package mockdb

import (
	context "context"
	sql "database/sql"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	model "github.com/yashagw/logingestor/db/model"
)

// MockProvider is a mock of Provider interface.
type MockProvider struct {
	ctrl     *gomock.Controller
	recorder *MockProviderMockRecorder
}

// MockProviderMockRecorder is the mock recorder for MockProvider.
type MockProviderMockRecorder struct {
	mock *MockProvider
}

// NewMockProvider creates a new mock instance.
func NewMockProvider(ctrl *gomock.Controller) *MockProvider {
	mock := &MockProvider{ctrl: ctrl}
	mock.recorder = &MockProviderMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockProvider) EXPECT() *MockProviderMockRecorder {
	return m.recorder
}

// Close mocks base method.
func (m *MockProvider) Close() error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Close")
	ret0, _ := ret[0].(error)
	return ret0
}

// Close indicates an expected call of Close.
func (mr *MockProviderMockRecorder) Close() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Close", reflect.TypeOf((*MockProvider)(nil).Close))
}

// DB mocks base method.
func (m *MockProvider) DB() *sql.DB {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "DB")
	ret0, _ := ret[0].(*sql.DB)
	return ret0
}

// DB indicates an expected call of DB.
func (mr *MockProviderMockRecorder) DB() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "DB", reflect.TypeOf((*MockProvider)(nil).DB))
}

// InsertLogEntry mocks base method.
func (m *MockProvider) InsertLogEntry(arg0 context.Context, arg1 *model.CreateLogEntryRequest) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "InsertLogEntry", arg0, arg1)
	ret0, _ := ret[0].(error)
	return ret0
}

// InsertLogEntry indicates an expected call of InsertLogEntry.
func (mr *MockProviderMockRecorder) InsertLogEntry(arg0, arg1 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "InsertLogEntry", reflect.TypeOf((*MockProvider)(nil).InsertLogEntry), arg0, arg1)
}

// Tx mocks base method.
func (m *MockProvider) Tx() *sql.Tx {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Tx")
	ret0, _ := ret[0].(*sql.Tx)
	return ret0
}

// Tx indicates an expected call of Tx.
func (mr *MockProviderMockRecorder) Tx() *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Tx", reflect.TypeOf((*MockProvider)(nil).Tx))
}