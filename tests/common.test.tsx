import { render } from '@testing-library/react'

import { describe, it } from '@jest/globals';

import { Card } from "../src/index";

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<Card.Root></Card.Root>)
  })
})