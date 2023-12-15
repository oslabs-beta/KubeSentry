/**
 * @jest-environment jsdom
 */


import React from 'react'
import { PodCard, PodCardProps } from "../src/app/ui/PodCard";
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

describe('Unit testing React components', () => {
  describe('PodCard', () => {
    const mockOnClick = jest.fn();
    const mockPodData: PodCardProps = {
        podName: 'coredns-5dd5756b68-425cd',
        podStatus: 'Running',
        nameSpace: 'kube-system',
        handleClick: mockOnClick,
    }

    test('PodCard displays Name, Status, and Namespace', () => {
      render( <PodCard {...mockPodData}/> )
      const podCard = screen.getByRole('article')
      expect(podCard).toHaveTextContent(mockPodData.podName)
      expect(podCard).toHaveTextContent(mockPodData.podStatus)
      expect(podCard).toHaveTextContent(mockPodData.nameSpace)
    });

    test('PodCard delete button can be clicked', () => {
      render( <PodCard {...mockPodData}/> )
      const podCard = screen.getByRole('article')
      const deleteButton = screen.getByRole('button', {name: /Delete/i})
      expect(podCard).toContainElement(deleteButton);
      fireEvent.click(deleteButton)
      expect(mockOnClick).toHaveBeenCalled()
    });
  });
});


