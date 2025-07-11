export interface DragItem {
  id: string
  type: string
  status: string
}

export const dragDropConfig = {
  types: {
    TASK: "task",
  },
  statuses: {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    REVIEW: "review",
    DONE: "done",
  },
}

export const getDropAnimation = (isDragging: boolean, isOver: boolean) => {
  if (isDragging) {
    return "transform: rotate(5deg) scale(1.05); opacity: 0.8; z-index: 1000;"
  }
  if (isOver) {
    return "transform: scale(1.02); background-color: rgba(59, 130, 246, 0.1);"
  }
  return "transform: scale(1); transition: all 0.2s ease;"
}

export const getColumnAnimation = (isOver: boolean, canDrop: boolean) => {
  if (isOver && canDrop) {
    return "border-color: rgb(59, 130, 246); background-color: rgba(59, 130, 246, 0.05);"
  }
  return "border-color: rgb(229, 231, 235);"
}
