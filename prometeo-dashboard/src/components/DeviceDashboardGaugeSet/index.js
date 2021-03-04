import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeviceGauge from '../DeviceGauge';
import AppContext from '../../context/app';
import Utils from '../../utils/Utils';
import Constants from '../../utils/Constants';
import NotificationFilled20 from '@carbon/icons-react/lib/notification--filled/20';

function DeviceDashboardGaugeSet({
  device_id,
  timestamp_mins,
  device_timestamp,
  temperature,
  humidity,
  carbon_monoxide,
  nitrogen_dioxide,
  increment,
}) {
  const { t, locale } = useContext(AppContext);
  let background = 'database'; // "websocket"
  if (new Date() - Date.parse(device_timestamp) < 10000) {
    background = 'websocket'
  }
  const dateFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  function toLocaleUTCDateString() {
    let utcDate = new Date(Date.parse(device_timestamp));
    return utcDate.toLocaleDateString(locale, dateFormatOptions) + ' UTC';
  } 

  return (
    <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
      <div className="bx--grid bx--grid--full-width dashboard-content">
        <div className={'bx--row dashboard-tile background-' + background}>
          <div className="bx--col-md-6 label-firefighter">
            <Link
              to={'/details/' + device_id}
              className="bx--link label-firefighter"
              title={device_id}>
              {device_id}
              <br />
            </Link>
            {toLocaleUTCDateString()}
            {/* t('content.details.now') */}
          </div>
          <div className="bx--col-md-2 icon-firefighter">
            {new Date(Date.UTC()) - new Date(Date.parse(device_timestamp)) < Constants.RECENT_NOTIFICATION_MILLISECONDS && (
              <NotificationFilled20 />
            )}
          </div>
        </div>
        <div className={'bx--row dashboard-tile background-' + background}>
          <div className="bx--col bx--col-md-2">
            <div>
              <DeviceGauge
                device_id={device_id}
                type={'CO'}
                value={carbon_monoxide}
                increment={increment}
                unit={'ppm'}
                gauge={Utils.getPercentage('CO', carbon_monoxide, increment)}
              />
            </div>
            <div className="label-legend">CO</div>
          </div>
          <div className="bx--col bx--col-md-2">
            <div>
              <DeviceGauge
                device_id={device_id}
                type={'NO2'}
                value={nitrogen_dioxide}
                increment={increment}
                unit={'ppm'}
                gauge={Utils.getPercentage('NO2', nitrogen_dioxide, increment)}
              />
            </div>
            <div className="label-legend">
              NO<sub>2</sub>
            </div>
          </div>
          <div className="bx--col bx--col-md-2">
            <div>
              <DeviceGauge
                device_id={device_id}
                type={'Tmp'}
                value={temperature}
                increment={increment}
                unit={'°C'}
                gauge={Utils.getPercentage('Tmp', temperature, increment)}
              />
            </div>
            <div className="label-legend">
              {t('content.common.temperature')}
            </div>
          </div>
          <div className="bx--col bx--col-md-2">
            <div>
              <DeviceGauge
                device_id={device_id}
                type={'Hum'}
                value={humidity}
                increment={increment}
                unit={'%'}
                gauge={Utils.getPercentage('Hum', humidity, increment)}
              />
            </div>
            <div className="label-legend">{t('content.common.humidity')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDashboardGaugeSet;
