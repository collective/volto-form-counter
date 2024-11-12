import CounterWidget from 'volto-form-counter/components/Widgets/CounterWidget/CounterWidget';
import { composeSchema } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { resetCounterState } from 'volto-form-counter/reducers';

const messages = defineMessages({
  counter_widget_check: {
    id: 'counter_widget_check',
    defaultMessage: 'Attiva un contatore su questa form',
  },
  counter_widget_check_description: {
    id: 'counter_widget_check_description',
    defaultMessage:
      'Se attivo verrà assegnato un numero identificativo per ogni richiesta effettuata dal form. Se vuoi inserire il valore del contatore negli altri campi del blocco, utilizza la sintassi ${form_counter_form_counter}.',
  },
});

const applyConfig = (config) => {
  const formSchema = config.blocks.blocksConfig.form.formSchema;

  config.widgets.widget.counter_widget = CounterWidget;

  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    form: {
      ...config.blocks.blocksConfig.form,
      formSchema: composeSchema(formSchema, ({ schema }) => {
        const intl = useIntl();
        schema.fieldsets[0].fields.push('counter_enabled', 'counter_reset');

        schema.properties = {
          ...schema.properties,
          counter_enabled: {
            type: 'boolean',
            title: intl.formatMessage(messages.counter_widget_check),
            description: intl.formatMessage(
              messages.counter_widget_check_description,
            ),
          },
          counter_reset: {
            title: 'Contatore',
            widget: 'counter_widget',
          },
        };

        return schema;
      }),
    },
  };

  config.addonReducers = {
    ...config.addonReducers,
    resetCounterState,
  };

  return config;
};

export default applyConfig;
