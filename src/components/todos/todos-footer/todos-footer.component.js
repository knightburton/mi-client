import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faMinusSquare, faCheckSquare } from '@fortawesome/fontawesome-free-solid';

export default class TodosFooter extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { todos, handleRemoveCompletedClick, handleCompleteAllClick } = this.props;
    const activeLeft = todos.reduce((left, {completed}) => completed ? left : left + 1, 0);

    return (
      <div className="row mt-2">
        <div className="col">
          <div className="row px-1 align-items-center">
            <div className="col-md-2 text-left">
              <p>
                <span className="font-weight-bold text-info">{activeLeft}</span> items left
              </p>
            </div>

            <div className="col-md-8 text-center">
              <div className="form-check form-check-inline mr-2">
                <input
                  className="form-check-input cursor-pointer"
                  type="radio"
                  name="visibility"
                  id="visibility-all"
                  value="all"
                  checked={true} />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="visibility-all">
                  All
                </label>
              </div>

              <div className="form-check form-check-inline mx-2">
                <input
                  className="form-check-input cursor-pointercursor-pointer"
                  type="radio"
                  name="visibility"
                  id="visibility-active"
                  value="active" />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="visibility-active">
                  Active
                </label>
              </div>

              <div className="form-check form-check-inline ml-2">
                <input
                  className="form-check-input cursor-pointer"
                  type="radio"
                  name="visibility"
                  id="visibility-completed"
                  value="completed" />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="visibility-completed">
                  Completed
                </label>
              </div>
            </div>

            <div className="col-md-2 text-right">
              <span title="Remove completed todos" onClick={handleRemoveCompletedClick}>
                <FontAwesomeIcon
                  icon={faMinusSquare}
                  size="2x"
                  className="text-danger cursor-pointer mr-2" />
              </span>

              <span title="Complete all todos" onClick={handleCompleteAllClick}>
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  size="2x"
                  className="text-info cursor-pointer ml-2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TodosFooter.propTypes = {
  todos: PropTypes.array.isRequired,
  handleRemoveCompletedClick: PropTypes.func.isRequired,
  handleCompleteAllClick: PropTypes.func.isRequired
};
