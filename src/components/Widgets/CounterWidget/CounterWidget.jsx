import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Input } from 'semantic-ui-react';
import { resetCounter, getCounterValue } from 'volto-form-counter/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import checkSVG from '@plone/volto/icons/check.svg';
// import deleteSVG from '@plone/volto/icons/delete.svg';

/* Style */
import './counterWidget.scss';

const messages = defineMessages({
  counter_title: {
    id: 'counter_widget_counter_title',
    defaultMessage: 'Numero di richieste',
  },
  reset_label: {
    id: 'counter_widget_reset_label',
    defaultMessage: 'Azzera il contatore',
  },
  counter_set_label: {
    id: 'counter_widget_counter_set_label',
    defaultMessage: 'Imposta',
  },
  counter_error: {
    id: 'counter_widget_counter_error',
    defaultMessage:
      'Siamo spiacenti, il contatore non è stato correttamente impostato! Riprovare più tardi.',
  },
  counter_success: {
    id: 'counter_widget_counter_success',
    defaultMessage: 'Impostazione del contatore confermata.',
  },
});

const CounterWidget = (props) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const { block } = props;
  const resetCounterState = useSelector((state) => state.resetCounterState);
  const counterState = useSelector((state) => state.counterValueState);
  const counterValue = counterState?.result?.[block] ?? 0;

  const [showNotify, setShowNotify] = useState(false);
  const [notifyError, setNotifyError] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [counterInput, setCounterInput] = useState(null);

  useEffect(() => {
    if (resetCounterState?.loaded && !resetCounterState?.error) {
      setNotifySuccess(true);
      // get counter value
      dispatch(
        getCounterValue({
          path: getBaseUrl(location?.pathname || ''),
          block_id: block,
        }),
      );
    }

    if (resetCounterState?.error) {
      setNotifyError(true);
    }

    setTimeout(() => {
      setNotifyError(false);
      setNotifySuccess(false);
      setShowNotify(false);
    }, 7000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCounterState]);

  // initialized form counter input
  useEffect(() => {
    dispatch(
      getCounterValue({
        path: getBaseUrl(location?.pathname || ''),
        block_id: block,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (counterValue) {
      setCounterInput(counterValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterValue]);

  return (
    <Grid.Row className="counter-widget">
      <div class="ui message info tiny wrapper-widget">
        <p>
          <label htmlFor="form_counter">
            {intl.formatMessage(messages.counter_title)}:
          </label>
          <Input
            type="number"
            id="form_counter"
            name="form_counter"
            value={counterInput}
            onChange={(e) => setCounterInput(e.target.value)}
          />
        </p>

        {/* SET COUNTER BUTTON */}
        <Button
          onClick={() => {
            setShowNotify(true);
            dispatch(
              resetCounter({
                path: getBaseUrl(location?.pathname || ''),
                value: counterInput,
                block_id: block,
              }),
            );
          }}
          size="tiny"
          compact
        >
          {intl.formatMessage(messages.counter_set_label)}
        </Button>

        {/* ERROR RESET NOTIFY */}
        {showNotify && notifyError && (
          <div className="ui negative message">
            <small>{intl.formatMessage(messages.counter_error)}</small>
          </div>
        )}

        {/* SUCCESS RESET NOTIFY */}
        {showNotify && notifySuccess && (
          <div className="ui positive message">
            <Icon name={checkSVG} size="1.5rem" />{' '}
            <small>{intl.formatMessage(messages.counter_success)}</small>
          </div>
        )}
      </div>
    </Grid.Row>
  );
};

export default CounterWidget;
