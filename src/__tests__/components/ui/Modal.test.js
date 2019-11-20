import React from 'react';
import Modal from '../../../components/ui/Modal';
import { render, fireEvent } from '@testing-library/react';

it('renders renders correctly, shows children and closes', () => {

  const setVisible = jest.fn();
  const div = document.createElement('div');
  const modal = document.createElement('div');
  modal.setAttribute("id", "modal");
  document.body.appendChild(modal);
  const { getByText, getByTestId } = render(
    <Modal
      modalVisible={true}
      setModalVisible={setVisible}
    >
      <div>test</div>
    </Modal>, div
  );

  expect(getByText('test')).toBeTruthy();
    const overlay = getByTestId('overlay')
  fireEvent.mouseDown(overlay);

  expect(setVisible).toHaveBeenCalledTimes(1);
})