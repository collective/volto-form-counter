import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Input } from 'semantic-ui-react';
import { resetCounter } from 'volto-form-counter/actions';
import { getFormData } from 'volto-form-block/actions';
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

  const formData = useSelector((state) => state.formData);
  const formCounter = formData?.result?.form_counter ?? 0;
  const resetCounterState = useSelector((state) => state.resetCounterState);

  const [showNotify, setShowNotify] = useState(false);
  const [notifyError, setNotifyError] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [counterInput, setCounterInput] = useState(null);

  const reloadFormData = () => {
    dispatch(
      getFormData({
        path: getBaseUrl(location?.pathname || ''),
      }),
    );
  };

  useEffect(() => {
    if (resetCounterState?.loaded && !resetCounterState?.error) {
      reloadFormData();
      setNotifySuccess(true);
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
    if (formCounter) {
      setCounterInput(formCounter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formCounter]);

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

        {/* {formCounter > 0 && (
          <>
            {/* ERROR RESET NOTIFY
            {notifyError && (
              <div className="ui negative message">
                <small>{intl.formatMessage(messages.counter_error)}</small>
              </div>
            )}
            {/* RESET BUTTON
            <Button
              onClick={() =>
                dispatch(
                  resetCounter({
                    path: getBaseUrl(location?.pathname || ''),
                  }),
                )
              }
              size="tiny"
              compact
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon name={deleteSVG} size="1.5rem" />{' '}
              {intl.formatMessage(messages.reset_label)}
            </Button>
          </>
        )} */}
      </div>
    </Grid.Row>
  );
};

export default CounterWidget;
