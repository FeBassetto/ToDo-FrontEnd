import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import EditTaskForm from "../components/Forms/EditTaskForm";
import Loader from "../components/Loader/Loader";
import NoLogin from "../components/NoLogin/NoLogin";
import NotFoundContent from "../components/NotFoundContent/NotFoundContent";
import { taskActions } from "../store/actions/taskActions";


const EditTask = (props: any) => {

    const { id } = useParams()

    // eslint-disable-next-line array-callback-return
    const tasksById = props.tasks !== null ? props.tasks.filter((task: any) => {
        if (task.id === id) {
            return task
        }
    }) : []

    let error;

    try {
        if (props.taskById.error) {
            error = true
        } else {
            error = false
        }
    } catch (error) {
        // eslint-disable-next-line no-ex-assign
        error = false
    }

    useEffect(() => {
        if (tasksById.length < 1) {
            props.getTaskById(id)
        } else {
            props.addById(tasksById)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <section>
            {!props.token && !props.loading && (
                <NoLogin />
            )}

            {props.loading && (
                <Loader />
            )}
            {!props.loading && props.token && !error && (tasksById.length === 1 || props.taskById !== null) && (
                <EditTaskForm
                    task={tasksById.length === 1 ? tasksById[0] : props.taskById}
                    editTask={props.editTask}
                />
            )}
            {error && !props.loading && (
                <NotFoundContent />
            )}
        </section>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(taskActions, dispatch)

const mapStateToProps = (state: any) => ({
    loading: state.loadingReducer.loading,
    token: state.userReducer.token,
    tasks: state.taskReducer.tasks,
    taskById: state.taskReducer.taskById
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTask)