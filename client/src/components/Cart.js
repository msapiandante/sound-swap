import React, {useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {useLazyQuery} from '@apollo/client';
import {QUERY_CHECKOUT} from '../utils/queries';
import {idbPromise} from '../utils/helpers';
import Auth from '../utils/auth';
import {useStoreContext} from '../utils/GlobalState'
import { ADD_MULTIPLE_TO_CART } from '../utils/actions';

