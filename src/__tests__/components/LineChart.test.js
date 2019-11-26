import LineChart from '~/components/LineChart';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })
describe('LineChart component', () => {

    it('Should handle event start', () => {
        const wrapper = shallow(<LineChart/>);
        const instance = wrapper.instance();
        const eventStart = { type: "start", timestamp: 1519862400000, select: ["min_response_time", "max_response_time"], group: ["os", "browser"] };
        instance.handleStartEvent(eventStart)
        expect(instance.state.start).toEqual(eventStart.timestamp);
         expect(instance.state.stop).toEqual(0);
    });

    it('Should handle event stop', () => {
        const wrapper = shallow(<LineChart/>);
        const instance = wrapper.instance();
        const eventStop = { type: "stop", timestamp: 1519862460000 };
        instance.handleStopEvent(eventStop);
        expect(instance.state.stop).toEqual(eventStop.timestamp);
    });

    it('Should handle event span', () => {
        const wrapper = shallow(<LineChart/>);
        const instance = wrapper.instance();
        const eventSpan = { type: "span", timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000 };
        const spy = jest.spyOn(instance, 'getSecondsBtweenTwoDates');
        instance.handleSpanEvent(eventSpan);
        expect(instance.state.span.begin).toEqual(eventSpan.begin);
        expect(instance.state.span.end).toEqual(eventSpan.end);
        expect(spy).toHaveBeenCalledTimes(1);
        const spanRangeTo = instance.getSecondsBtweenTwoDates(eventSpan);
        expect(instance.state.options.xaxis.categories[0]).toEqual("00:00");
        expect(instance.state.options.xaxis.categories[1]).toEqual(spanRangeTo);
    });

    it('Should test a function that return the seconds bteween two timestamps', () => {
        const wrapper = shallow(<LineChart/>);
        const instance = wrapper.instance();
        const times = { begin: 1519862400000, end: 1519862460000 };
        expect(instance.getSecondsBtweenTwoDates(times)).toEqual("01:00");
    });

});