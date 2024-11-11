import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Grid } from 'semantic-ui-react';
import { resetCounter } from 'volto-form-counter/actions';
import { getFormData } from 'volto-form-block/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import deleteSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  counter_title: {
    id: 'counter_widget_counter_title',
    defaultMessage: 'Numero di richieste',
  },
  reset_label: {
    id: 'counter_widget_reset_label',
    defaultMessage: 'Azzera il contatore',
  },
  counter_error: {
    id: 'counter_widget_counter_error',
    defaultMessage: 'Siamo spiacenti, il contatore non è stato correttamente azzerato! Riprovare più tardi.',
  },
});

const CounterWidget = (props) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.formData);
  const formCounter = formData?.result?.form_counter ?? 0;
  const resetCounterState = useSelector((state) => state.resetCounterState);

  const [notifyError, setNotifyError] =  useState(false);

  const reloadFormData = () => {
    dispatch(
      getFormData({
        path: getBaseUrl(location?.pathname || ''),
      }),
    )
  };

  useEffect(() => {
    if(resetCounterState?.loaded && !formData?.error) {
      reloadFormData();
    }

    if (resetCounterState?.error) {
      setNotifyError(true);
      setTimeout(() => {
        setNotifyError(false);
      }, 7000);
    }

  }, [resetCounterState]);

  return (
    <Grid.Row>
        <div class="ui message info tiny">
          <p>{intl.formatMessage(messages.counter_title)}: {formCounter}</p>
          {formCounter > 0 && (
            <>
              {/* ERROR RESET NOTIFY */}
              {notifyError && (
                <div className="ui negative message">
                  <small>{intl.formatMessage(messages.counter_error)}</small>
                </div>
              )}
              {/* RESET BUTTON */}
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
          )}
        </div>
    </Grid.Row>
  );
};

export default CounterWidget;
